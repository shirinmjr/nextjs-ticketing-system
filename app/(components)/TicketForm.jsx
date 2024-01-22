"use client";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

const TicketForm = ({ ticket }) => {

    const EDIT_MODE = ticket._id === "new" ? false : true;
    const router = useRouter();

    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "Hardware Problem",
    };

    if (EDIT_MODE) {
        startingTicketData["title"] = ticket.title;
        startingTicketData["description"] = ticket.description;
        startingTicketData["priority"] = ticket.priority;
        startingTicketData["progress"] = ticket.progress;
        startingTicketData["category"] = ticket.category;
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevSate) => ({
            ...prevSate,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        console.log("form submit");
        console.log("ticket:", ticket);
        e.preventDefault();
        let res = "";
        if (EDIT_MODE) {
            res = await fetch(`/api/Tickets/${ticket._id}`, {
                method: "PUT",
                body: JSON.stringify({ formData }),
                "content-type": "application/json"
            });
            if (!res.ok) {
                throw new Error("Failed to Update Ticket.");
            }
        } else {
            res = await fetch("/api/Tickets", {
                method: "POST",
                body: JSON.stringify({ formData }),
                "content-type": "application/json"
            });
            if (!res.ok) {
                throw new Error("Failed to create Ticket.");
            }
        };

        router.push("/");
        router.refresh();
    };

    const [formData, setFormData] = useState(startingTicketData);

    return (
        <div className="flex justify-center">
            <form className="flex flex-col gap-3 w-1/2"
                method="post" onSubmit={handleSubmit}>
                <h3>
                    {EDIT_MODE ? "Update your Ticket" : "Create Your Ticket"}
                </h3>
                <label>Title</label>
                <input id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    required={true}
                    value={formData.title}
                />
                <label>Description</label>
                <textarea id="description"
                    name="description"
                    onChange={handleChange}
                    required={true}
                    value={formData.description}
                    rows="5"
                />
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Hardware Problem">Hardware Problem</option>
                    <option value="Software Problem">Software Problem</option>
                    <option value="Projects">Projects</option>
                </select>
                <label>Priority</label>
                <div>
                    <input id="priority-1"
                        name="priority"
                        type="radio"
                        onChange={handleChange}
                        value={1}
                        checked={formData.priority == 1}
                    />
                    <label>1</label>

                    <input id="priority-2"
                        name="priority"
                        type="radio"
                        onChange={handleChange}
                        value={2}
                        checked={formData.priority == 2}
                    />
                    <label>2</label>

                    <input id="priority-3"
                        name="priority"
                        type="radio"
                        onChange={handleChange}
                        value={3}
                        checked={formData.priority == 3}
                    />
                    <label>3</label>

                    <input id="priority-4"
                        name="priority"
                        type="radio"
                        onChange={handleChange}
                        value={4}
                        checked={formData.priority == 4}
                    />
                    <label>4</label>

                    <input id="priority-5"
                        name="priority"
                        type="radio"
                        onChange={handleChange}
                        value={5}
                        checked={formData.priority == 5}
                    />
                    <label>5</label>
                </div>
                <label>Progress</label>
                <input
                    type="range"
                    id="progress"
                    name="progress"
                    value={formData.progress}
                    min="0"
                    max="100"
                    onChange={handleChange}
                />
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="not started">Not Started</option>
                    <option value="started">Started</option>
                    <option value="done">Done</option>
                </select>
                <input type="submit" className="btn" value={EDIT_MODE ? "Update Ticket" : "Create Ticket"} />
            </form>
        </div>
    );
};

export default TicketForm;