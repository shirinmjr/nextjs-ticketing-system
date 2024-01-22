import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const ticketInfo = await Ticket.findOne({ _id: id });
        return NextResponse.json({ ticketInfo }, { stats: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to get ticket info", error }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const body = await req.json();
        const ticketData = body.formData;
        const updateTicketData = await Ticket.findByIdAndUpdate(id, {
            ...ticketData
        });

        return NextResponse.json({ message: "Ticket Updated", updateTicketData }, { stats: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await Ticket.findByIdAndDelete(id);
        return NextResponse.json({ message: "Ticket Deleted" }, { stats: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

