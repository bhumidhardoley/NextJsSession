import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req:Request){

    try {
        const {username , password} = await req.json()

        await connectDB();

        if(!password || !username) {
            return NextResponse.json({
                message:'Every Field is required'
            },{status: 401})
        }

        const user = await User.findOne({username})
        if(!user){
            return NextResponse.json({
                message: 'User not Found'
            },
        {status: 400})
        }
        const isPasswrodCorrect = await bcrypt.compare(password,user.password)

        if(!isPasswrodCorrect){
            return NextResponse.json({
                message: 'Invalid Credentials'
            },{
                status: 401
            })
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET!,{
                expiresIn: '1d'
            }
        )


        const reponse =  NextResponse.json({
            message: 'Login Successful'
        },{
            status: 200
        })

        reponse.cookies.set('session',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV ==="production",
            path: '/',
            maxAge: 60*60*24,
        })

        return reponse;
    } catch(error: any){
        return NextResponse.json({
            message: error.message
        },
    {status: 500})
    }
}