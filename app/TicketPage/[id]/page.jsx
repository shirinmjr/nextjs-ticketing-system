import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to get ticket information");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

let updateTicketData = {};

const TicketPage = async ({ params }) => {
    const EDIT_MODE = params.id === "new" ? false : true;

    if (EDIT_MODE) {
        updateTicketData = await getTicketById(params.id);
        console.log(updateTicketData);
        updateTicketData = updateTicketData.ticketInfo;
    } else {
        updateTicketData = {
            _id: "new",
        };
    }
    return (
        <TicketForm ticket={updateTicketData} />
    );
};

export default TicketPage;