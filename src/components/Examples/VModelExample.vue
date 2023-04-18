<template>
    <div
        class="v-model-example"
    >
        <div>
            <input
                type="text"
                :value="value"
                @input="onInput"
                class="native-input"
            />
        </div>
        <div>
            Fetched collection: {{collection}}
        </div>
        <div>
            <v-select
                :value="selectedItem"
                outlined
                dense
                :items="selectItems"
                item-text="title"
                item-value="id"
                @change="onChange"
            />
        </div>
    </div>
</template>

<script>

export default {
    name: 'VModelExample',
    props: {
        value: {
            type: [String, Number]
        },
        selectedItem: {
            type: [String, Number]
        },
    },
    data() {
        return {
            loading: false,
            collection: null,
            selectItems: [
                {
                    title: "Item 1",
                    id: 'item-1'
                },
                {
                    title: "Item 2",
                    id: 'item-2'
                }
            ]
        }
    },
    created() {
        this.fetchData()
    },
    mounted() {
        this.fetchData()
    },
    updated() {
        this.$nextTick(() => {
            console.log('updated')
        })
    },
    destroyed() {
        console.log('destroyed')
    },
    methods: {
        fetchData() {
            setTimeout(async () => {
                this.collection = 123
            }, 1000)
        },
        onInput(e) {
            const value = e.target.value

            this.$emit('input', value)
        },
        onChange(value) {
            this.$emit('update:selectedItem', value)
        },
        vBindSelect() {
            return {
                items: this.selectedItem,
                itemText: 'title',
                itemValue: 'id'
            }
        }
    }
}
</script>

<style lang="scss">
    .v-model-example {
        .native-input {
            border: #000 solid 1px;
        }
    }
</style>
