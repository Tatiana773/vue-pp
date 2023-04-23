<template>
    <v-data-table
      :headers="headers"
      :items="news"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </template>
<script>
export default {
    name: 'ItemsTable',
  data () {
    return {
      headers: [
        {
          text: '#',
          value: 'number',
        },
        { text: 'Title', value: 'title' },
        { text: 'Category', value: 'category' },
      ],
        news: [
        {
          number: '1',
          title: "News1",
          category: "Main",
        },
    ]
    }
  },
}
</script>