import { PrismaClient, Status, Feedback, Category } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

function generateChildrenComments(parentCommentId: string, count: number, users: any[]) {
    let childrenComments = [];
    for (let i = 0; i < count; i++) {
        const childComment = {
            id: faker.string.uuid(),
            content: faker.lorem.sentence(),
            userEmail: users[Math.floor(Math.random() * users.length)].email,
            parentCommentId
        }
        childrenComments.push(childComment);
    }
    return childrenComments;
}

function generateComments(count: number, feedbackId: string, users: any[]) {
    let comments = [];
    for (let i = 0; i < count; i++) {
        const id = faker.string.uuid();
        const user = users[Math.floor(Math.random() * users.length)];
        const comment = {
            id,
            content: faker.lorem.sentence(),
            userEmail: user.email,
            parentFeedbackId: feedbackId,
            children: generateChildrenComments(id, Math.floor(Math.random() * 10), users)
        }
        if (comment.userEmail)
            comments.push(comment);
    }
    return comments;
}

function generateCategories(count: number) {
    let categories: Category[] = [];
    for (let i = 0; i < count; i++) {
        const category = {
            name: faker.lorem.word()
        }
        categories.push(category);
    }
    return categories;
}


function generateUsers(count: number, tags: { id: string; name: string; }[], categories: { name: string }[]) {
    let users: any[] = [];
    for (let i = 0; i < count; i++) {
        const email = faker.internet.email();
        let user = {
            email,
            username: faker.internet.userName(),
            name: faker.person.fullName()
        }
        users.push(user);
    }
    users = users.map(user => ({
        ...user,
        feedbacks: [...generateFeedbacks(5, user.email, tags, categories, users)]
    }))
    return users;
}

function generateFeedbacks(count: number, userEmail: string, tags: { id: string; name: string; }[], categories: { name: string }[], users: any[]) {
    let feedbacks = [];
    for (let i = 0; i < count; i++) {
        const id = faker.string.uuid();
        let feedback = {
            id,
            heading: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            tags: tags.splice(Math.floor(Math.random() * tags.length), Math.floor(Math.random() * 10)),
            upvotes: faker.number.int(100),
            userEmail,
            status: ['PLANNED', 'INPROGRESS', 'LIVE'][Math.floor(Math.random() * 3)],
            categoryName: categories[Math.floor(Math.random() * 5)].name,
            comments: generateComments(Math.floor(Math.random() * 10), id, users)
        }
        feedbacks.push(feedback);
    }
    return feedbacks
}

function generateTags(count: number) {
    let tags = [];
    for (let i = 0; i < count; i++) {
        let tag = {
            id: faker.string.uuid(),
            name: faker.lorem.word()
        }
        tags.push(tag);
    }
    return tags;
}

async function main() {

    await prisma.user.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.feedback.deleteMany();
    await prisma.category.deleteMany();

    const tags = generateTags(20);
    const categories = generateCategories(5);

    // await prisma.tag.createMany({
    //     data: tags
    // })

    const users = generateUsers(30, tags, categories);

    const data1 = {
        "data": {
            "email": "Gaston_Halvorson@yahoo.com",
            "username": "Vanessa73",
            "name": "Angel Daugherty II",
            "feedbacks": {
                "create": [
                    {
                        "id": "89d3d623-076c-48d0-881c-fa7966397d09",
                        "heading": "Desparatus sub absorbeo ad vero ter.",
                        "content": "Tabernus harum valeo compello suadeo stabilis. Una eveniet cruciamentum adeptio exercitationem. Adfero facilis auxilium conduco aestivus volup molestias.",
                        "upvotes": 82,
                        "status": "LIVE" as Status,
                        "category": {
                            "connectOrCreate": {
                                "where": {
                                    "name": "ducimus"
                                },
                                "create": {
                                    "name": "ducimus"
                                }
                            }
                        },
                        "tags": {
                            "connectOrCreate": [
                                {
                                    "where": {
                                        "id": "fee3d800-366e-403d-b308-b6dedc922345"
                                    },
                                    "create": {
                                        "name": "ademptio"
                                    }
                                }
                            ]
                        },
                        "comments": {
                            "create": [
                                {
                                    "id": "600b5f52-1c79-4f27-a059-6204014c86f3",
                                    "content": "Tergeo terreo admitto avarus absconditus.",
                                    "userEmail": "Elda14@hotmail.com",
                                    // "parentFeedbackId": "89d3d623-076c-48d0-881c-fa7966397d09",
                                    "children": {
                                        "create": [
                                            {
                                                "id": "test",
                                                "content": "Tergeo terreo admitto avarus absconditus.",
                                                "userEmail": "Elda14@hotmail.com",
                                                // "parentCommentId": "600b5f52-1c79-4f27-a059-6204014c86f3",
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }

    // await prisma.user.create(data1);

    for (const user of users) {
        const data = {
            data: {
                email: user.email,
                username: user.username,
                name: user.name,
                feedbacks: {
                    create: user.feedbacks.map((feedback: any) => ({
                        id: feedback.id,
                        heading: feedback.heading,
                        content: feedback.content,
                        upvotes: feedback.upvotes,
                        status: feedback.status as Status,
                        category: {
                            connectOrCreate: {
                                where: {
                                    name: feedback.categoryName
                                },
                                create: {
                                    name: feedback.categoryName
                                }
                            }
                        },
                        tags: {
                            connectOrCreate: feedback.tags.map((tag: any) => ({
                                where: {
                                    id: tag.id
                                },
                                create: {
                                    name: tag.name
                                }
                            }))
                        },
                    }))
                }
            }
        }
        await prisma.user.create(data);
    }

    for (let user of users) {
        for (let feedback of user.feedbacks) {
            for (let comment of feedback.comments) {
                await prisma.comment.create({
                    data: {
                        id: comment.id,
                        content: comment.content,
                        author: {
                            connect: {
                                email: comment.userEmail
                            }
                        },
                        feedback: {
                            connect: { id: feedback.id }
                        }
                    }
                })
                for (let childComment of comment.children) {
                    await prisma.comment.create({
                        data: {
                            content: childComment.content,
                            author: {
                                connect: { email: childComment.userEmail }
                            },
                            parentComment: {
                                connect: {
                                    id: childComment.parentCommentId
                                }
                            }
                        }
                    })
                }
            }
        }
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })