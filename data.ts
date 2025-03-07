import { CourseType } from "@/types"

export const categories = [
    {
        id: 1,
        img: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "SHIRT STYLE!",
    },
    {
        id: 2,
        img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "LOUNGEWEAR LOVE",
    },
    {
        id: 3,
        img: "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        title: "LIGHT JACKETS",
    },
]

export const featuredCourses: CourseType[] = [
    {
        _id: 1,
        image: "/courses/trade.png",
        title: "Certified CryptoCurrency Market Analyst (CCA)",
        category: "Cryptocurrency",
        facilitator: "Mahmoud Sardauna",
        facilitatorImage: "/review/mh.jpg",
        shortDesc:
            "Welcome to the Blockchain Fundamentals Course. Explore Blockchain: Learn about the secure record-keeping system behind Bitcoin.",
        duration: {
            hours: 6,
            minutes: 40,
        },
        students: 30,
        rating: 4.5,
        price: 19999,
        onDemandVideos: 60,
        downloadableFiles: 15,
        courseDesc:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut. Curabitur elit justo, consequat id condimentum ac, volutpat ornare.",
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut. Curabitur elit justo, consequat id condimentum ac, volutpat ornare.",
        whatYoullLearn: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dor",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dor",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dor",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dor",
        ],
        courseContent: [
            "Lorem ipsum dolor sit amet, consectetur",
            "adipiscing elit. Donec venenatis, dolor in finibus malesuada",
            "lectus ipsum porta nunc, at iaculis arcu nisi sed",
            "malesuada consequat elit. Curabitur elit justo, consequat",
            "id condimentum ac, volutpat ornare. Nulla fer",
            "ullamcorper sit amet, tortor pretium ut, eget",
            "venenatis velit. Donec vulputate, nibh at",
            "scelerisque felis. Nulla fermentum, ligula ut",
        ],
        review: [
            {
                id: 1,
                stars: 5,
                comment:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est fringilla morbi mauris gravida. Eu vel arcu neque vitae vitae justo. Sit integer faucibus in dictumst amet hac. Enim amet, elementum faucibus id ultrices facilisis. Integer sed aenean consectetur.",
                Name: "Muhammad Sabiu Danfullo",
            },
            {
                id: 2,
                stars: 4,
                comment:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est fringilla morbi mauris gravida. Eu vel arcu neque vitae vitae justo. Sit integer faucibus in dictumst amet hac. Enim amet, elementum faucibus id ultrices facilisis. Integer sed aenean consectetur.",
                Name: "Bilal Lawal",
            },
            {
                id: 3,
                stars: 5,
                comment:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est fringilla morbi mauris gravida. Eu vel arcu neque vitae vitae justo. Sit integer faucibus in dictumst amet hac. Enim amet, elementum faucibus id ultrices facilisis. Integer sed aenean consectetur.",
                Name: "Muhammad MSageer",
            },
        ],
    },
    {
        _id: 2,
        image: "/courses/mkt.jpeg",
        title: "Certified Blockchain Marketing Specialist (CBM)",
        category: "Cryptocurrency",
        facilitator: "Bello Usman A.",
        facilitatorImage: "/review/usman.jpg",
        shortDesc:
            "Welcome to the Blockchain Fundamentals Course. Explore Blockchain: Learn about the secure record-keeping system behind Bitcoin.",
        duration: {
            hours: 6,
            minutes: 40,
        },
        students: 30,
        rating: 4.3,
        price: 14999,
        onDemandVideos: 60,
        downloadableFiles: 15,
        review: [],
    },
    {
        _id: 3,
        image: "/courses/ui.png",
        title: "Certified Blockchain UI/UX Designer (CBX)",
        category: "Cryptocurrency",
        facilitator: "Bello Usman A",
        facilitatorImage: "/review/usman.jpg",
        shortDesc:
            "Welcome to the Blockchain Fundamentals Course. Explore Blockchain: Learn about the secure record-keeping system behind Bitcoin.",
        duration: {
            hours: 6,
            minutes: 40,
        },
        students: 30,
        rating: 4.3,
        price: 9999,
        onDemandVideos: 60,
        downloadableFiles: 15,
        review: [],
    },
    // {
    //   id: 4,
    //   img: "/courses/art.jpg",
    //   title: "Certified Blockchain Graphics Artist (CBA)",
    //   desc: "Design stunning arts that won't be willing to leave your pages.",
    //   time: "6h 40m",
    //   student: 30,
    //   price: 9999,
    // },

    // {
    //   id: 5,
    //   img: "/courses/art.jpg",
    //   title: "Certified Blockchain Graphics Artist (CBA)",
    //   desc: "Design stunning arts that won't be willing to leave your pages.",
    //   time: "6h 40m",
    //   student: 30,
    //   price: 9,999,
    // },

    // {
    //   id: 6,
    //   img: "/courses/art.jpg",
    //   title: "Certified Blockchain Graphics Artist (CBA)",
    //   desc: "Design stunning arts that won't be willing to leave your pages.",
    //   time: "6h 40m",
    //   student: 30,
    //   price: 9999,
    // },

    // // {
    // //   id: 7,
    // //   img: "/courses/art.jpg",
    // //   title: "Certified Blockchain Graphics Artist (CBA)",
    // //   desc: "Design stunning arts that won't be willing to leave your pages.",
    // //   time: "6h 40m",
    // //   student: 30,
    // //   price: "9,999",
    // // },
]

export const newsList = [
    {
        id: 1,
        img: "/news/btc.jpeg",
        title: "Shrimp and Chorizo Paella  perfect party dish",
        desc: " This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. Add 1 cup of frozen peas along with the mussels,if you like.",
        date: "May 18 2022",
    },
    {
        id: 2,
        img: "/news/luna.png",
        title: "Terra Luna crash: how it happened, what's next?",
        desc: "At one point, the Terra Luna blockchain was valued at $40 billion. Then, it came crashing down. Now, each Luna coin is worth $0. Lets talk about how this happened and whats next for the whole crypto world after the",
        date: "July 05 2022",
    },
    {
        id: 3,
        img: "/news/ftx.png",
        title: "FTX Token Falls 80% Despite Binance Bailout",
        desc: "The net exit of crypto was industry-wide as FTX closed off customer withdrawals and ultimately filed for bankruptcy protection filed for bankruptcy protection. filed for bankruptcy protection filed for",
        date: "October 12 2022",
    },
]

export const events = [
    {
        id: 1,
        img: "/news/btc.jpeg",
        title: "Shrimp and Chorizo Paella  perfect party dish",
        desc: " This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. Add 1 cup of frozen peas along with the mussels,if you",
        date: "May 18 2022",
        time: "4:00 PM Promt",
        venue: "No: 24 bitkova office Zoo road kano",
    },
    {
        id: 2,
        img: "/news/luna.png",
        title: "Terra Luna crash: how it happened, what's next?",
        desc: "At one point, the Terra Luna blockchain was valued at $40 billion. Then, it came crashing down. Now, each Luna coin is worth $0. Lets talk about how this happened and whats next for the whole crypto world after",
        date: "July 05 2022",
        time: "7:00 PM Promt",
        venue: "Gyadigyadi opp baballe ila mosque",
    },
]

export const testimonials = [
    {
        id: 1,
        bg: "/review/bg/btc.jpeg",
        img: "/review/usman.jpg",
        name: "Usman Bello A",
        profession: "Blockchain software engineer",
        value: 4.5,
        comment:
            "I started Bitkova with zero knowledge about what I am transitioning into and not being sure about my decision. Now, based on what I’ve learnt I am taking things head on with UI Designing. I mean from not knowing what whitespace was to knowing my left and right in what I’ve been taught with all passion.",
    },
    {
        id: 2,
        bg: "/review/bg/intro.jpg",
        img: "/review/mh.jpg",
        name: "Mahmoud Sardauna",
        profession: "UIUX Designer",
        value: 5,
        comment:
            "I started Bitkova with zero knowledge about what I am transitioning into and not being sure about my decision. Now, based on what I’ve learnt I am taking things head on with UI Designing. I mean from not knowing what whitespace was to knowing my left and right in what I’ve been taught with all passion.",
    },
    {
        id: 3,
        bg: "/review/bg/msbg.jpg",
        img: "/review/ms.jpg",
        name: "Engr M. Sageer",
        profession: "UIUX Designer",
        value: 3,
        comment:
            "I started Bitkova with zero knowledge about what I am transitioning into and not being sure about my decision. Now, based on what I’ve learnt I am taking things head on with UI Designing. I mean from not knowing what whitespace was to knowing my left and right in what I’ve been taught with all passion.",
    },
    // {
    //   id: 4,
    //   bg: "/review/bg/sctv.jpg",
    //   img: "/review/sunusi.jpg",
    //   name: "Sunusi Danjuma",
    //   profession: "Crypto Analysis",
    //   value: 3.5,
    //   comment: "I started Bitkova with zero knowledge about what I am transitioning into and not being sure about my decision. Now, based on what I’ve learnt I am taking things head on with UI Designing. I mean from not knowing what whitespace was to knowing my left and right in what I’ve been taught with all passion.",
    // },
    // {
    //   id: 5,
    //   bg: "/review/bg/sdk.jpg",
    //   img: "/review/sd.jpg",
    //   name: "Sadik Yusuf",
    //   profession: "Graphics Design",
    //   value: 4,
    //   comment: "I started Bitkova with zero knowledge about what I am transitioning into and not being sure about my decision. Now, based on what I’ve learnt I am taking things head on with UI Designing. I mean from not knowing what whitespace was to knowing my left and right in what I’ve been taught with all passion..",
    // },
]
