import Ticket from "../(models)/Tickets";
import { NextResponse } from "next/server";

export async function POST(req) {
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