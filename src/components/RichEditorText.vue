<template>
    <div>
        <div class="editor">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div class="menubar mymenubar">
                    <input type="file" ref="file" @change="processFile($event, commands.image)" style="display: none">
                    <div class="menubar__p  mymenubar__p" @click="$refs.file.click()">
                        <img src="../img/image.svg" />
                    </div>
                    <div class="menubar__p mymenubar__p " :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                        <img src="../img/bold.svg" />
                    </div>
                    <div class="menubar__p  mymenubar__p" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                        <img src="../img/italic.svg" />
                    </div>
                    <div class="menubar__p mymenubar__p " :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
                        <img src="../img/strikethrough.svg" />
                    </div>
                    <div class="menubar__p  mymenubar__p" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                        <img src="../img/underline.svg" />
                    </div>
                    <div class="menubar__p  mymenubar__p" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
                        <img src="../img/list.svg" />
                    </div>
                    <div class="menubar__p mymenubar__p " :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
                        <img src="../img/list-numbers.svg" />
                    </div>
                    <div class="menubar__p  mymenubar__p" @click="commands.undo">
                        <img src="../img/undo.svg" />
                    </div>
                    <div class="menubar__p  mymenubar__p" @click="commands.redo">
                        <img src="../img/redo.svg" />
                    </div>
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
    import { db, storageRef, storage, firebase } from '../config/db'


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
        mounted() {
            this.setContent()
        },
        methods: {
            processFile(event, command) {
                let self = this
                self.photos = event.target.files[0]
                let uploadTask = storageRef.child('app/images/' + self.photos.name).put(self.photos);
                uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = progress;
                }, function (error) {
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        self.url = downloadURL;
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

<style>
    .is-active {
        background-color: #e4e4e4;
    }

    .mymenubar {
        display: flex !important;
        height: 1.5em;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .mymenubar__p {
        height: 100%;
        padding: 0em 0.5em;
    }

        .mymenubar__p img {
            height: 100%;
        }


</style>
