"use client";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

const TicketForm = () => {

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevSate) => ({
            ...prevSate,
            [name]: value,
        }));
    };

    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "Hardware Problem"
    };

    const [formData, setFormData] = useState(startingTicketData);
    return (
        <div className="flex justify-center"><form>
            <h3>Create Your Ticket</h3>
            <label>Title</label>
            <input id="title"
                name="title"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.title}
            />
        </form></div>
    );
};

export default TicketForm;