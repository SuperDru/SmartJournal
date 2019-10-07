// const data=
//     [
//         {
//             id:'12213',
//             userDays: [
//                 {
//                     date: "2018-08-06T00:00:00",
//                     isAttended: true,
//                     isPaid: true
//                 },
//                 {
//                     date: "2018-08-09T00:00:00",
//                     isAttended: true,
//                     isPaid: true
//                 },
//                 {
//                     date: "2018-08-15T00:00:00",
//                     isAttended: true,
//                     isPaid: true
//                 },
//                 {
//                     date: "2018-08-17T00:00:00",
//                     isAttended: true,
//                     isPaid: true
//                 }
//             ],
//             userProfile: {
//                 name: "Alexander",
//                 surname: "Shishkin",
//                 patronymic: "Dmitrievich",
//                 phoneNumber: 83149545254,
//                 email: "ashishkin@mail.ru"
//             },
//             accountAmount: 1100,
//             dept: 0
//         },
//         {
//             id:'12345',
//             userDays: [
//                 {
//                     date: "2018-08-06T00:00:00",
//                     isAttended: false,
//                     isPaid: false
//                 },
//                 {
//                     date: "2018-08-09T00:00:00",
//                     isAttended: false,
//                     isPaid: false
//                 },
//                 {
//                     date: "2018-08-13T00:00:00",
//                     isAttended: false,
//                     isPaid: false
//                 }
//             ],
//             userProfile: {
//                 name: "Andrey",
//                 surname: "Shurikov",
//                 patronymic: "Vasilievich",
//                 phoneNumber: 83149565253,
//                 email: "ashurikov@mail.ru"
//             },
//             accountAmount: 500,
//             dept: 0
//         },
//         {
//             id:'12343',
//             userDays: [
//                 {
//                     date: "2018-08-06T00:00:00",
//                     isAttended: false,
//                     isPaid: false
//                 },
//                 {
//                     date: "2018-08-09T00:00:00",
//                     isAttended: false,
//                     isPaid: false
//                 },
//                 {
//                     date: "2018-08-13T00:00:00",
//                     isAttended: false,
//                     isPaid: false
//                 }
//             ],
//             userProfile: {
//                 name: "Fedoz",
//                 surname: "TitOFF",
//                 patronymic: "Mikhailovich",
//                 phoneNumber: 83149565253,
//                 email: "ashurikov@mail.ru"
//             },
//             accountAmount: 1000,
//             dept: 150000
//         }
//     ];

// const data_schedule=[{
//     group: {
//         number: 1,
//         days: {
//             mon: true,
//             tues: false,
//             wed: true,
//             thurs: false,
//             fri: false,
//             sat: false,
//             sun: false
//         }
//     }
// },
//     {
//         group: {
//             number: 2,
//             days: {
//                 mon: false,
//                 tues: true,
//                 wed: false,
//                 thurs: false,
//                 fri: true,
//                 sat: false,
//                 sun: false
//             }
//         }
//     }
//     ];


const data=[
    {
        id: 2,
        name: "group_two",
        cost: 350,
        weekSchedule: {
            groupId: 1,
            days: [
                false,
                true,
                false,
                false,
                true,
                false,
                false
            ],
            startTime: "14:00",
            endTime: "16:00"
        },
        trueSchedules: [],
        users: [
            {
                userId: 0,
                groupId: 2,
                user: {
                    id: 0,
                    name: "Fedoz",
                    surname: "Shishkin",
                    patronymic: "Dmitrievich",
                    phoneNumber: 83149545254,
                    email: "ashishkin@mail.ru",
                    password: null,
                    account: {
                        userId: 2,
                        amount: 1800.0,
                        dept: 0.0,
                        updatedAt: "2018-08-11T00:00:00"
                    },
                    groups: [],
                    roles: [
                        {
                            userId: 2,
                            roleId: 2,
                            role: {
                                id: 2,
                                name: "student"
                            }
                        }
                    ],
                    attendance: [
                        {
                            userId: 2,
                            date: "2018-08-06T00:00:00",
                            isAttended: true,
                            paymentAmount: 350.0,
                            dept: false,
                            groupId: 1
                        },
                        {
                            userId: 2,
                            date: "2018-08-09T00:00:00",
                            isAttended: true,
                            paymentAmount: 350.0,
                            dept: false,
                            groupId: 1
                        }
                    ],
                    payments: [
                        {
                            userId: 2,
                            amount: 2000.0,
                            payday: "2018-08-11T00:00:00"
                        },
                        {
                            userId: 2,
                            amount: 500.0,
                            payday: "2018-09-15T00:00:00"
                        }
                    ]
                }
            },
        ]
    },
    {
        id: 1,
        name: "group_one",
        cost: 350,
        weekSchedule: {
            groupId: 1,
            days: [
                true,
                false,
                false,
                true,
                false,
                false,
                false
            ],
            startTime: "14:00",
            endTime: "16:00"
        },
        trueSchedules: [
            {
                groupId: 1,
                month: "2018-08-01T00:00:00",
                days: [
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                    false,
                    false,
                    true,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    true,
                    false,
                    false
                ],
                discounts: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            }
        ],
        users: [
            {
                userId: 2,
                groupId: 1,
                user: {
                    id: 2,
                    name: "Alexander",
                    surname: "Shishkin",
                    patronymic: "Dmitrievich",
                    phoneNumber: 83149545254,
                    email: "ashishkin@mail.ru",
                    password: null,
                    account: {
                        userId: 2,
                        amount: 1800.0,
                        dept: 0.0,
                        updatedAt: "2018-08-11T00:00:00"
                    },
                    groups: [],
                    roles: [
                        {
                            userId: 2,
                            roleId: 2,
                            role: {
                                id: 2,
                                name: "student"
                            }
                        }
                    ],
                    attendance: [
                        {
                            userId: 2,
                            date: "2018-08-06T00:00:00",
                            isAttended: true,
                            paymentAmount: 350.0,
                            dept: false,
                            groupId: 1
                        },
                        {
                            userId: 2,
                            date: "2018-08-09T00:00:00",
                            isAttended: true,
                            paymentAmount: 350.0,
                            dept: false,
                            groupId: 1
                        }
                    ],
                    payments: [
                        {
                            userId: 2,
                            amount: 2000.0,
                            payday: "2018-08-11T00:00:00"
                        },
                        {
                            userId: 2,
                            amount: 500.0,
                            payday: "2018-09-15T00:00:00"
                        }
                    ]
                }
            },
            {
                userId: 3,
                groupId: 1,
                user: {
                    id: 3,
                    name: "Andrey",
                    surname: "Shurikov",
                    patronymic: "Vasilievich",
                    phoneNumber: 83149565253,
                    email: "ashurikov@mail.ru",
                    password: null,
                    account: {
                        userId: 3,
                        amount: 150.0,
                        dept: 200.0,
                        updatedAt: "2018-08-14T00:00:00"
                    },
                    groups: [],
                    roles: [
                        {
                            userId: 3,
                            roleId: 2,
                            role: {
                                id: 2,
                                name: "student"
                            }
                        }
                    ],
                    attendance: [
                        {
                            userId: 3,
                            date: "2018-08-06T00:00:00",
                            isAttended: true,
                            paymentAmount: 350.0,
                            dept: false,
                            groupId: 1
                        },
                        {
                            userId: 3,
                            date: "2018-08-09T00:00:00",
                            isAttended: false,
                            paymentAmount: 0.0,
                            dept: false,
                            groupId: 1
                        },
                        {
                            userId: 3,
                            date: "2018-08-13T00:00:00",
                            isAttended: true,
                            paymentAmount: 0.0,
                            dept: true,
                            groupId: 1
                        }
                    ],
                    payments: [
                        {
                            userId: 3,
                            amount: 500.0,
                            payday: "2018-08-14T00:00:00"
                        }
                    ]
                }
            }
        ]
    }
];

// export const getSchedule=()=>new Promise((resolve,reject)=>{
//     console.log('getSchedule-api');
//     if (true) {
//         resolve(data_schedule)
//     } else {
//         reject(Error('broke'))
//     }
// });

const get_groups_data=[
    {
        "guid": "9d8628f2-f9c3-4556-a5ac-be2697158669",
        "name": "group2",
        "days": [ true, false, false, false, true, false, false ],
        "startTimes": [ "14:00", "", "", "", "10:00", "", "" ],
        "duration": 100,
        "cost": 350
    },
    {
        "guid": "f1f52068-eeb0-460f-8fa0-253e820a4832",
        "name": "group1",
        "days": [ false, true, false, false, true, false, false ],
        "startTimes": [ "", "14:00", "", "", "10:00", "", "" ],
        "duration": 90,
        "cost": 300
    }
];

const getSchedule=[
    {
        "Date": "2019-11-17",
        "StartTime": "12:15",
        "Discount": "15"
    },
    {
        "Date": "2019-01-05",
        "StartTime": "14:15",
        "Discount": "0"
    }
];

export const response=(type)=>new Promise((resolve, reject)=> {
    if (type === "getSchedule") {
        resolve(getSchedule);
    } else {
        reject(Error('broke'));
    }
});

export const getData=()=>new Promise((resolve, reject)=> {
    console.log('getUsers-api');
    if (true) {
        resolve(data)
    } else {
        reject(Error('broke'))
    }
});

export const editUser=row=>new Promise((resolve, reject)=> {
    console.log('editRows-api');
    if (true) {
        //find(row, 1);
        row[row.id] = row;
        resolve(true)
    } else {
        reject(Error('broke'))
    }
});

export const deleteUser=id=>new Promise((resolve, reject)=>{
    //console.log('getRows');
    if(data[id]){
        delete data[id];
        resolve()
    }
    else{
        reject(Error('broke'))
    }
});






