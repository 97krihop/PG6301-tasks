const React = require('react');
const {mount} = require('enzyme');
const {Match} = require("../../src/client/match");
const {quiz} = require("../../src/server/db/quizzes");
const {overrideFetch, asyncCheckCondition} = require('../../../../../../PG6301-tasks/test/mytest-utils');
const app = require('../../src/server/app');

function isQuizDisplayed(driver) {
    const quiz = driver.find('.quizContainer');
    const questions = driver.find('.question');
    const answers = driver.find('.answer');

    return quiz.length === 1 && questions.length === 1 && answers.length === 4;
}

function getDisplayedQuiz(driver) {
    const quizDiv = driver.find('.quizContainer').at(0);
    const html_id = quizDiv.prop('id');
    const id = parseInt(html_id.substring("quiz_".length, html_id.length));

    return quiz.find(e => e.id === id);
}

async function waitForQuizDisplayed(driver) {

    return await asyncCheckCondition(() => {
        driver.update();
        return isQuizDisplayed(driver);
    }, 2000, 200);
}

test('Test rendered quiz', async () => {
    overrideFetch(app);

    const driver = mount(<Match/>);

    const displayed = await waitForQuizDisplayed(driver);

    expect(displayed).toEqual(true);
});

test("test wrong answer clicked", async () => {
    overrideFetch(app);

    const driver = mount(<Match/>);
    await waitForQuizDisplayed(driver);

    const quiz = getDisplayedQuiz(driver);
    const first = driver.find('.answer').at((quiz.correct + 1) % 4);

    first.simulate('click');

    expect(driver.html().includes("Lost")).toEqual(true);
    expect(driver.html().includes("Won")).toEqual(false);
});

test("Test do answer correctly", async () => {
    overrideFetch(app);

    const driver = mount(<Match/>);

    await waitForQuizDisplayed(driver);

    const quiz = getDisplayedQuiz(driver);
    const correct = quiz.correct;

    const first = driver.find('.answer').at(correct);
    first.simulate('click');

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(false);
    expect(won).toEqual(false);

    //game still on
    const displayed = await waitForQuizDisplayed(driver);
    expect(displayed).toEqual(true);
});

test("Test win match", async () => {
    overrideFetch(app);

    const driver = mount(<Match/>);

    await waitForQuizDisplayed(driver);

    for (let i = 0; i < 3; i++) {
        const quiz = getDisplayedQuiz(driver);
        const correct = quiz.correct;

        const first = driver.find('.answer').at(correct);
        first.simulate('click');

        driver.update();
    }

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(false);
    expect(won).toEqual(true);
});
