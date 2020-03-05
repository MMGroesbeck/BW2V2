import React from 'react';

const startData = {
    users: [
        {
            name: "Tak Loufer",
            instructor: true,
            password: "12345",
            enrolled: [1,2]
        },
        {
            name: "Kid",
            instructor: false,
            password: "12345",
            enrolled: [2]
        }
    ],
    classes: [
    {
        name: "Core Training for Beginners",
        type: "core",
        date: "12/21/79",
        start: "10:00 am",
        duration: "45 min",
        intensity: "low",
        location: "Trolley Barn Park",
        registered: 7,
        max: 15,
        instructor: "Tak Loufer",
        id: 1
    },
    {
        name: "Yoga for Harmonica Players",
        type: "yoga",
        date: "01/17/75",
        start: "9:30 pm",
        duration: "90 min",
        intensity: "high",
        location: "Bellona park",
        registered: 2,
        max: 5,
        instructor: "Lanya",
        id: 2
    }
]
}

export default startData;