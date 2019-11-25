let siteMetadata = {
    title: `Alchemy of Remembrance`,
    capitalizeTitleOnHome: true,
    logo: `/images/Alchemy of Remembrance Logo.png`,
    icon: `/images/icon.png`,
    titleImage: `/images/wall.jpg`,
    introTag: `Podcaster || Sangoma || Cacao Kuchina || Health & Longevity`,
    description: `Living to create, learn, and explore the truth.`,
    author: `Gabriel`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: false,
    switchTheme: true,
    navLinks: [
        {
            name: "HOME",
            url: "/"
        },
        {
            name: "ABOUT",
            url: "/about"
        },
        {
            name: "BLOG",
            url: "/blog"
        },
        {
            name: "PORTFOLIO",
            url: "/portfolio"
        },
        {
            name: "CONTACT",
            url: "/contact"
        }
    ],
    footerLinks: [
        {
            name: "PRIVACY POLICY",
            url: "/privacy-policy"
        },
        // {
        //     name: "GitHub",
        //     url: "https://github.com/akzhy/gatsby-starter-elemental"
        // }
    ],
    social: [
        {
            name: "Facebook",
            icon: "/images/Facebook.svg",
            url: "https://www.facebook.com/alchemyremembrance/"
        },
        // {
        //     name: "Twitter",
        //     icon: "/images/Twitter.svg",
        //     url: "#"
        // },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "https://www.instagram.com/alchemyofremembrance/"
        },
        {
            name: "Youtube",
            icon: "/images/Youtube.svg",
            url: "https://www.youtube.com/channel/UCMuZwqrNoHY6-wRrDVfCKLg/"
        }
    ],
    contact: {
        /* Leave the below value completely empty (no space either) if you don't want a contact form. */
        api_url: "./test.json",
        description: `Contact Matthew here. Ask your questions for the podcast, send an amazing experience to share, or just get in touch.`,
        mail: "mattb007@gmail.com",
        phone: "083-293-5904"
      }
};

module.exports = {
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    "gatsby-remark-copy-linked-files",
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1280
                        }
                    }
                ]
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `contents`,
                path: `${__dirname}/contents/`
            }
        },
        {
            resolve: `gatsby-plugin-less`,
            options: {
                strictMath: true
            }
        },
        {
           resolve: `gatsby-source-graphql`,

           options: {
             // This type will contain remote schema Query type
             typeName: `WPGraphQL`,
             // This is field under which it's accessible
             fieldName: `wpgraphql`,
             // Url to query from
            // url: `http://41.185.8.137/~xic02/alchemyofremembrance/graphql`,
            url: `http://alchemy-of-remembrance.local/graphql`
           },
         }
    ]
};
