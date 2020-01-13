<template>
    <div>
    <button @click="read">click</button>
    <button @click="update">click</button>
    <button @click="deletel">click</button>
    </div>
</template>

<script>
// RecentDocuments.vue
import { db } from '../config/db'

export default {
  data() {
    return {
      documents: [],
    }
  },

  firebase: {
    documents: db.ref('documents'),
  },
  methods:{
      read(){
          // retrieve a collection
        db.ref('documents').once('value', snapshot => {
        const documents = snapshot.val()
        // do something with documents
        console.log(documents)
        })
      },
      update(){
        db.ref('documents').update({ id: "hello" }).then(() => {
            console.log('user updated!')
        })
        db.ref('documents/lieu').update({ id: "titi" }).then(() => {
            console.log('titi updated!')
        })
      },
      deletel(){
          db.ref('documents/lieu/id').remove().then(() => {
            console.log('titi delete!')
        })
      }
  }
}

</script>