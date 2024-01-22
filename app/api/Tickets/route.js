import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("GET all Ticket");
    try {
        const tickets = await Ticket.find();
        console.log("All Tickets Info: ", tickets);
        return NextResponse.json({ tickets }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }

}

export async function POST(req) {
    console.log("POST Ticket");
    try {
        const body = await req.json();
        const ticketData = body.formData;
        const response = await Ticket.create(ticketData);
        console.log("New Ticket Info: ", response);
        return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }

}
