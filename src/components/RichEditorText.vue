<template>
  <div>
    <div class="editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
             <p
          class="menubar__p"
          @click="showImagePrompt(commands.image)"
        >
image        </p>
          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >Bold
          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
Italic          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
Strike          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
Underline          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
Code          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
P          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
Ul          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
Ol          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
Quote          </p>

          <p
            class="menubar__p"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
Code          </p>

          <p
            class="menubar__p"
            @click="commands.horizontal_rule"
          >
           hr
          </p>

          <p
            class="menubar__p"
            @click="commands.undo"
          >
Undo          </p>

          <p
            class="menubar__p"
            @click="commands.redo"
          >
Redo          </p>

        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor" />

    </div>

    <div class="export">
      <h3>HTML</h3>
      <pre><code>{{ html }}</code></pre>
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
    Image,

} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar,
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
      showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
    setContent() {
      // you can pass a json document
      this.editor.setContent({
        type: 'doc',
        content: [{
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is some inserted text. 👋',
            },
          ],
        }],
      }, true)
      // HTML string is also supported
      // this.editor.setContent('<p>This is some inserted text. 👋</p>')
      this.editor.focus()
    },
  },
}
</script>
