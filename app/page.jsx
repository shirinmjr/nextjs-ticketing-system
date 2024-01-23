import TicketCard from "./(components)/TicketCard";
import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

/** Note To self
 * Making a call from homepage is not recommended
 * API calls should be isolated in a separate file under api/
 * Since we are building static pages for this there are 2 solutions 
 * 1- Run the api on a different server and make call to that end point at the build time
 * 2- Make call to Database on load (Not a very good option but in this case works)
 */
const getAllTicketsOnLoad = async () => {
  try {
    const tickets = await Ticket.find();
    //const tickets = res.json();
    console.log("All Tickets Info: ", tickets);
    return { tickets };
  } catch (error) {
    return ({ message: "Error", error });
  }
};

const Dashboard = async () => {
  const { tickets } = await getAllTicketsOnLoad();
  //console.log("getting all the tickets on load", tickets);
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div className="mb-4" key={categoryIndex}>
              <h2 className="text-orange-400">{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    < TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  )
                  )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

/*
//Correct approach to make call to the back-end but since we are building static pages this cannot happen at the build time
    const getTickets = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API}/api/Tickets`, {
          cache: "no-store"
        });
        return res.json();
      } catch (error) {
        console.log("Failed to get tickets", error);
      }
    };
*/