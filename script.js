$(document).ready(function() {
    // Helper functions
    const isSolved = obj =>
          Object.keys(obj).includes("howto");
    
    const solved = obj => {
        $("#solution").html(obj.howto);
        $("#form").hide();
        $("#solution-container").show();
    };

    const ask = obj => {
        $("#solution-container").hide();
        $("#question").text(obj.question);
        $("#info").text(obj.info);
    };
	
	let solution = {
		sdk: "Ok, let's do this, first download Android SDK and install Android drivers with SDK downloader!<br/><br/>",
		bluestacks: "Now go and install BlueStacks, install Steam Community app and enable Steam Guard on there!<br/><br/>",
		commands: "As you downloaded the SDK, you should now have adb.exe. Open PowerShell window and navigate to the folder you have your adb.exe. From now on $ means a command, do not type the $ into PowerShell!<br/><br/>$ <i>.\adb.exe shell</i><br/>$ su<br/>$ cd /data/data/com.valvesoftware.android.steam.community/files<br/>$ cat * | sed 's/,/\\n/g'<br/><br/>Now you see lines of text, you should see<br/><br/>\"shared_secret\":\"qwertyuiopasdfghjklzxcvbnm\"<br/><br/>From that line you copy the <i>qwertyuiopasdfghjklzxcvbnm</i> WITHOUT the quotes!!<br/><br/>Now when you run code.jar it will ask you for the shared secret, paste it there! That's all, from now on it will work!"
	}

    // Form navigation tree
    let selection_tree = {
        question: "Do you have rooted Android phone?",
        info: "It's easiest to get shared_secret from a rooted Android phone!",
        yes: {
            howto: solution.sdk + solution.commands
        },
        no: {
            question: "Are you willing to root your phone?",
            info: "It's better to root than get the code any other way!",
            yes: {
                howto: "GREAT! Root your phone and come back here!"
            },
            no: {
                question: "Do you trade on your Steam account or sell anything on Steam Community Market?",
                info: "(csgo/dota/etc skins or anything like trading cards)",
                yes: {
                    question: "Do you want to accept the trades on your phone?",
                    info: "If you don't care, it is possible to accept those on your PC!",
                    yes: {
                        howto: "Sorry! There is no way we could get it working for you! DO NOT send me comments if you made these choises, all you get is mean comments about how retarded you are!"
                    },
                    no: {
                        howto: solution.sdk + solution.bluestacks + solution.commands
                    }
                },
                no: {
                    howto: solution.sdk + solution.bluestacks + solution.commands
                }
            }
        }
    };

    let current = selection_tree;

    ask(current);

    $("#btn-no").on("click", function(event) {
        current = current.no;
        
        if (isSolved(current))
            solved(current);
        else
            ask(current);
    });

    $("#btn-yes").on("click", function(event) {
        current = current.yes;

        if (isSolved(current))
            solved(current);
        else
            ask(current);
    });
});
