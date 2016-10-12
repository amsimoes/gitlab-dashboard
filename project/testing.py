# Lista o numero de commits por ficheiro
@app.route('/projects/files/commits')
def list_file_stats():
    file_name = ".gitignore"
    commits, additions, deletions, creation_date, contributors = get_stats_per_file(file_name)
    if commits == 0:
        return "File {f} not commited yet.".format(f=file_name)
    lista = ', '.join(contributors)

    return "{f} | Creation date: {date} | \
        {c} Commits {a} Additions {d} Deletions \
        | Contributors: {l}".format(f=file_name,date=creation_date,c=commits,a=additions,d=deletions,l=lista)

def get_file_diff(project_id, commit_id):
    path = '/projects/{project_id}/repository/commits/{sha}/diff'.format(project_id=project_id, \
            sha=commit_id)
    response = make_get_request(path)

    #print("Len dicionario: "+str(len(response.json())))

    if len(str(response.content)) < 10: # Commit vazio
        return 'nothing'
    else:
        if len(response.json()) > 1:   # Mais que um ficheiro por commit, retorna dicionario
            file_names = []
            l = response.json()
            print(type(l[0]))
            for i in range(len(l)):
                f = l[i]['new_path']
                if '/' in f:
                    f = f.split('/')
                    f = f[-1]
                file_names.append(f)
            return file_names
        else:
            f_name = response.json()[0]["new_path"]
            if "/" in f_name:   # Ficheiro dentro de alguma pasta
                print("Dentro de uma pasta...")
                f_name = f_name.split("/")
                f_name = f_name[-1]
            return f_name


def get_stats_per_file(file_name):
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits?per_page=100'.format(project_id = project_id)
    response = make_get_request(path)
    commit_count = additions = deletions = 0
    contributors = []
    found = False

    for commits in response.json():
        res = get_file_diff(project_id, str(commits['id']))
        if isinstance(res, list):
            print(res)
            for i in range(len(res)):
                if res[i] == file_name:
                    res = file_name
                    break
        if res == file_name:
            if commits["author_name"] not in contributors:
                contributors.append(commits["author_name"])
            adds, dels = get_commit_stats(project_id, str(commits['id']))
            commit_count += 1
            additions += adds
            deletions += dels
            print("Additions: "+str(additions)+" Deletions: "+str(deletions))
            creation_date = commits['created_at']
            found = True
    if not found:
        return 0,0,0,0,0
    return commit_count, additions, deletions, parse_date(creation_date), contributors
