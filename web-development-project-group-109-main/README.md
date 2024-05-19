# COMP2110 Task Manager 2024

As part of your assignment submission, write notes about your implementation
in this file.

Group members:
    47789654 - Mark Dunne               - Task Summary Widget, Page Design, Task Card (a little bit of everything)
    45915016 - Paul Christian Acierda   - Calendar Widget, Page Design (Mostly Header)
    44828152 - Mungo Lennon             - Task Card, Page Design
    47859326 - Jia Jen Queek            - Mood Widget, Ad Widget, little something on models.js

IMPORTANT: At present, our task board only updates add and delete functions AFTER a page reset. This would be the case for edit too but we've implemented a _loadData() function inside the task-card class that re-updates them and force calls their render method. Ideally _loadData() would do very little if anything at all, and all of its code would only appear once in the connectedCallback() method. So add and delete DO work, but need a page refresh to see, sadly. - Mungo

Attributions:
- Header / Footer image: <a href="https://www.istockphoto.com/photo/background-light-brown-polished-wooden-plank-gm1652567664-534242054?clarity=false">image by istockphoto.com/apugach</a>
- Task Manager Background Image: <a href="https://www.istockphoto.com/photo/beautiful-string-lights-above-the-bed-gm1004928840-271373374?searchscope=image%2Cfilm">Image by istockphoto.com/warchi</a>
- Task Card backgrounds: <a href ="https://www.istockphoto.com/photo/blank-polaroid-style-photo-template-gm182488069-12281627?clarity=false">image by istockphoto.com/samxmeg</a>
- Highlighting: Broken down and isolated from this image: <a href ="https://www.istockphoto.com/vector/color-banners-drawn-with-japan-markers-stylish-elements-for-design-gm531057928-93641243?searchscope=image%2Cfilm">image by istockphoto.com/samuii</a>
- Task Card Priority Pin image (unused): <a href ="https://www.istockphoto.com/photo/wooden-circle-isolated-gm1398833154-452861185?clarity=false">image by istockphoto.com/Tarzhanova</a>