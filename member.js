function skillsMember() {
    var skills = ['HTML', 'CSS', 'JS', 'PHP', 'MySQL'];
    var member = {
        name: 'John',
        age: 25,
        skills: skills
    };
    console.log(member.skills);
    console.log(member.skills[2]);
    console.log(member.skills.length);
    console.log(member.skills[member.skills.length - 1]);
}
