<template>
  <div>
    <div class="editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
            <input type="file" ref="file" @change="processFile($event, commands.image)" style="display: none">
            <span class="menubar__p" @click="$refs.file.click()">
              Image        
            </span>
            <span class="menubar__p" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
              Bold
            </span>
            <span class="menubar__p" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
              Italic          
            </span>
            <span class="menubar__p" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
              Strike          
            </span>
            <span class="menubar__p" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
              Underline          
            </span>
            <span class="menubar__p" :class="{ 'is-active': isActive.code() }" @click="commands.code">
              Code          
            </span>
            <span class="menubar__p" :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph">
              P          
            </span>
            <span class="menubar__p" :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">
              H1
            </span>

          <span
            class="menubar__p"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </span>
          <span class="menubar__p" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">
            H3
          </span>

          <span class="menubar__p" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
            Ul          
          </span>
          <span class="menubar__p" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
            Ol 
          </span>
          <span class="menubar__p" :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote">
            Quote          
          </span>
          <span class="menubar__p" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">
            Code
          </span>
          <span class="menubar__p" @click="commands.horizontal_rule">
            hr
          </span>
          <span class="menubar__p" @click="commands.undo">
            Undo          
          </span>
          <span class="menubar__p" @click="commands.redo">
            Redo          
          </span>
        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor" />

    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image

} from 'tiptap-extensions'
import { db,storageRef,storage, firebase } from '../config/db'


export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
                    new Image(),

        ],
        onUpdate: ({ getHTML }) => {
          this.html = getHTML()
            this.$parent.description = this.html;

        },
      }),
      html: 'Update content to see changes',
    }
  },
  mounted (){
      this.setContent()
  },
  methods: {
    processFile(event,command) {
        let self=this
        self.photos = event.target.files[0]
        let uploadTask = storageRef.child('app/images/'+self.photos.name).put(self.photos);
        uploadTask.on('state_changed', function(snapshot){
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = progress;
        }, function(error) {
        }, function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            self.url=downloadURL;
            const src = self.url
            if (src !== null) {
              command({ src })
            }
          });
        }); 
    },
    setContent() {
      this.editor.setContent({
        type: 'doc',
        content: [{
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Description (texte, image, titre)',
            },
          ],
        }],
      }, true)
      this.editor.focus()
    },
  },
}
</script>
