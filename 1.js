import { Selector } from 'testcafe';

fixture `TestTask`
    .page `https://theboats.com/`;

const destinationInput = Selector('.css-vm1vlj input[type="text"]');
const suggestions = Selector('.select-destination-container');
const spainSelector = Selector('span').withExactText('Spain');
const inputValueSelector = Selector('.css-teaz5y');

test('destination input test', async t => {
    await t
        .typeText(destinationInput, 'Spa', { replace: true })
        .expect(suggestions.innerText).contains('Spain')
        .click(spainSelector);
    const populatedInputField = await Selector('.css-teaz5y').innerText;
    await t
        .expect(populatedInputField).eql('Spain');
});
