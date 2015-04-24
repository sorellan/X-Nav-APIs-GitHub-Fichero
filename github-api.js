var github;
var repo;
var results;
var repoHTML = "User: <input type='text' name='user' value='sorellan' " +
    "id='user' size='10' />" +
    "Repo: <input type='text' name='repo' value='X-Nav-APIs-GitHub-Fichero' " +
    "id='repo' size='10' />" +
    "<button type='button'>Search repo data</button>";
var repoFile = "File: <input type='text' name='file' value='filename' " +
    "id='file' size='10' />" +
    "Content: <input type='text' name='content' value='content' " +
    "id='content' size='10' />" +
    "<button type='button'>Create file</button>";

function btoa(data) {
    return window.btoa(data);
};

function getToken() {
	var tok = $("#token").val();
	console.log(tok);
	github = new Github({
  		token: tok,
  		auth: "oauth"
	});
	$("#form_repo").html(repoHTML);
	$("#form_repo button").click(getRepo);
};

function getRepo() {
    var username = $("#user").val();
    var reponame = $("#repo").val();
    repo = github.getRepo(username, reponame);
    results = $("#results");

    repo.show(function(err, repo) {
        if(err) {
            results.html("<p>Error: " + err.error + "</p>");
        } else {
            results.html("<p><b>Repo data:</b></p>" +
                "<ul><li>Full name: " + repo.full_name + "</li>" +
                "<li>Description: " + repo.description + "</li>" +
                "<li>Created at: " + repo.created_at + "</li>" +
                "<li>Html url: <a href='" + repo.html_url + "'>" + repo.html_url + "</li></ul>");
            $("#form_file").html(repoFile);
            $("#form_file button").click(setFile);
        }
    });
};

function setFile() {
    repo.write('master', $("#file").val(), $("#content").val(), 'Created file', function(err) {
        if(err) {
            results.append("<p>Error: " + err.error + "</p>");
        } else {
            results.append("<p>Created file</p>" + 
                "<button type='button' id='read'>Read file</button>");
            $("#read").click(readFile);
        }
    });
};

function readFile() {
    repo.read('master', $("#file").val(), function(err, data) {
        results.append("<p>Contents:</p><p>" + data + "</p>");
    });
};

jQuery(document).ready(function() {
	$("div#form button").click(getToken);	
});



