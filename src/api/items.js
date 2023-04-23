import { faker } from '@faker-js/faker'

const mockCategoriesCollection = () => {
    console.log('Make mock Items collection')

    const collection = []

    for (let i = 0; i < 10; i++) {
        collection.push({
            catId: faker.datatype.uuid(),
            title: faker.lorem.word(10)
        })
    }

    return collection
}

const categoryiesCollection = mockCategoriesCollection()

const mockItemsCollection = () => {
    console.log('Make mock Items collection')

    const collection = []

    for (let i = 0; i < 10; i++) {
        collection.push({
            id: faker.datatype.uuid(),
            title: faker.lorem.sentence(5),
            catId: categoryiesCollection[i].catId,
            createdAt: Date.now()
        })
    }

    return collection
}

const itemsCollection = mockItemsCollection()

export const getItemsCollection = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: 1,
                data: itemsCollection
            });
        }, 1000);
    })
}

export const getItemsCategoriesCollection = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: 1,
                data: categoryiesCollection
            });
        }, 1000);
    })
}
