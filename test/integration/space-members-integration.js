export default function spaceMembersTests (t, space) {
  t.test('Gets spaceMembers', t => {
    t.plan(1)
    return space.getSpaceMembers().then(response => {
      t.ok(response.sys, 'sys')
    })
  })
}
