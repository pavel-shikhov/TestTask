import { Role, Selector, ClientFunction } from 'testcafe';

fixture `Getting Started`
    .page `https://theboats.com/`;




test('Valid credentials', async t => {
    await t
        .useRole(regularAccUser)
        .navigateTo('https://theboats.com/')
        .click(menuButton)
    const menuItemCounter = await menu.child().nth(0).child().count;
    await t
        .expect(menuItemCounter).gt(1);
});

test('Invalid credentials', async t => {
    await t
        .useRole(wrongAccUser)
        .navigateTo('https://theboats.com/')
        .click(menuButton)
    const menuItemCounter = await menu.child().nth(0).child().count;
    await t
        .expect(menuItemCounter).eql(1);
});


const getUrl = ClientFunction(() => document.location.href);

const loginField = Selector('input').withAttribute('type', 'email');
const passwordField = Selector('input').withAttribute('type', 'password');
const menu = Selector('div').withAttribute('class', /css-[a-z0-9]+-menu/);
const menuButton = Selector('div').withAttribute('class', /jsx-[0-9]+ avatar-image/);

const regularAccUser = Role('https://theboats.com/login', async t => {
    await t
        .typeText(loginField, 'Pavel4Events@yandex.ru')
        .typeText(passwordField, 'BoatsAreGood.')
        .click(Selector('button').withExactText('Login'));
}, { preserveUrl: true });

const wrongAccUser = Role('https://theboats.com/login', async t => {
    await t
        .typeText(loginField, 'Pavel4Ets@yandex.ru')
        .typeText(passwordField, 'BoatsAreGo.')
        .click(Selector('button').withExactText('Login'));
});
