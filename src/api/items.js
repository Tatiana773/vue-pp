import { faker } from '@faker-js/faker'
import {randomInt} from '@/tools/utils'

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

    for (let i = 0; i < 100; i++) {
        const category = categoryiesCollection[randomInt(0,9)]

        collection.push({
            id: faker.datatype.uuid(),
            title: i+1 + " - " + faker.lorem.sentence(5),
            catId: category.catId,
            createdAt: Date.now()
        })
    }

    return collection
}

const itemsCollection = mockItemsCollection()

export const getItemsCollection = ({perPage, page, sortBy, sortDesc, search}) => {
    return new Promise((resolve) => {
        const params = {
            page: page ? Number(page) : null,
            perPage: perPage ? Number(perPage) : null,
            sortBy: sortBy || 'title',
            sortDesc: Number(sortDesc) === 0 ? 'ascending' : 'descending',
            search
        }

        const options = {}
        if (params.perPage && params.page) {
            options['limit'] = Number(params.perPage)
            options['skip'] = params.page ? (Number(params.page) - 1) * Number(params.perPage) : 0
        }

        setTimeout(() => {
            let result = []

            if(!options.limit && !options.skip) {
                result = itemsCollection
            } else {
                for (let i = 0; i < itemsCollection.length; i++) {
                    if(i <= options['skip'] - 1) {
                        continue
                    }

                    result.push(itemsCollection[i])

                    if(result.length === options.limit) {
                        break
                    }
                }
            }


            resolve({
                success: 1,
                total: itemsCollection.length,
                perPage: params.perPage,
                data: result
            });
        }, 100);
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
