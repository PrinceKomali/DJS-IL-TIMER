# DJS-IL-TIMER
this barely works lmao
# Setup:
> 1) Download and install [Nodejs](https://nodejs.org/en/download/)
> 2) Open file explorer and go to `C:\Users\(your name)`
> 3) Make a new folder here to store the files. This will be the directory you install the node modules in
> 4) Go to the [Discord Developer Portal](https://discord.com/developers/applications), and make a new application (name it whatever you want)
> 5) Go to the `Bot` tab on the sidebar, and click "Add Bot". Stay on this page, as we will need it later
> 6) Download the files and move them to the folder you made.
> 7) Open Command Prompt (`Win+R` and type `cmd`), and type `cd (your-folder-name)`. This should take you to the folder you made (inside command prompt)
> 8) Run the command `npm install discord.js fluent-ffmpeg ffprobe ffprobe-static ytdl-core fs ffmpeg-extract-frames`. This will install the modules you need
> 9) Go back to the Discord Developer Portal. On the Bot page, under `TOKEN`, click Copy.
> 10) Open the `discordtoken.json` with any text editor, and change the 2nd line to `"token":"PASTE YOUR TOKEN HERE"` (Don't forget to save)
> 11) On your server, make a new (preferably private) channel. This is necessary for the bot to work. On a different channel, type `\#channel-name` (e.g. `\#bot-dumping-box`) anc click enter. The channel ID will show up (e.g. <#123456789012>). Copy the part that is just numbers and paste it into line 3 of the `auth.json` file like you did with the token. 
> 13) Go back to the Dev Portal, and go to the OAuth2 page on the sidebar
> 14) In the first box, click `Bot`
> 15) A second box will appear. I recommend clicking `Administrator` to give the bot admin permissions, but if you don't want that, be sure to click "View Channels" and "Send Messages"
> 16) Click the copy button after the URL, paste it into a browser window, and follow the steps from there. This will add the bot to your server<br>
> 17) At this point, all the files should be set up. Open command prompt again, do `cd C:\(your name)\(your folder)`, then type `node index.js`.
The command should work at this point
