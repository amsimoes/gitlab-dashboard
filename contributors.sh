git log --numstat | awk '
function printStats(author) {
    printf "      name: %s,\n", author
    printf "      email: %s,\n", email[author]
    printf "      commits: %d,\n", commits[author]
    printf "      additions: %d,\n", more[author]
    printf "      deletions: %d\n", less[author]

}
/^Author:/ {
    author = $2
    for(i=3; i<NF; i++){
        author=author" "$i
    }
    email[author] = $NF
    commits[author] += 1
}
/^[0-9]/ {
    more[author] += $1
    less[author] += $2
}
END {
printf "{\n"
printf "  contributors: [\n"
i = 0
for (author in commits) {
    i++
    printf "    {\n"
    printStats(author)
    if (i<length(commits)){
        printf "    },\n"
    }else{
        printf "    }\n"
    }
}
printf "  ]\n"
printf "}\n"
}
'
