class TemplateTwo {
    static props = {
        theme: {
            defaultValue: 'orange',
            type: 'choice',
            choices: ['purple', 'green', 'orange', 'red', 'blue', 'pink']
        },
        question: {
            defaultValue: 'Enter question here',
            type: 'long text'
        },
        choiceA: {
            defaultValue: null,
            type: 'image'
        },
        choiceB: {
            defaultValue: null,
            type: 'image'
        },
        choiceC: {
            defaultValue: null,
            type: 'image'
        },
        choiceD: {
            defaultValue: null,
            type: 'image'
        },
        answer: {
            defaultValue: null,
            type: 'choice',
            choices: ['A', 'B', 'C', 'D']
        },
    }

    constructor(values) {
        this.props = TemplateTwo.props;
        this.values = values;
        this.render = () => TemplateTwo.doRender(this.values);
    }

    static doRender(options) {
        // console.log("Options: ", options);
        function getAnswerTemplate(fieldName, answer, value){
            if(!answer || !answer.length) return '';

            const randomId = (Math.random() * 1e32).toString(36);

            return `
                <div class="flex w-full TemplateTwoAnswer relative overflow-hidden">
                    <input type="radio" name="${fieldName}" id="${randomId}" class="hidden" value="${value}" />
                    <label for="${randomId}" class="bg-transparent border border-white font-extrabold text-white text-xs tracking-wider uppercase h-full w-full text-center">
                        <img class="absolute inset-0 h-full w-full object-cover" src="${answer}" />
                        <div class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                            <div class="border-2 bg-${options.theme}-500 border-2 rounded-full w-8 h-8 flex items-center justify-center">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                        </div>
                    </label>
                </div>
            `;
        }

        let answers = `<div class="flex-1 flex-shrink-0 w-full grid grid-cols-2 gap-1">`;
        const { choiceA, choiceB, choiceC, choiceD } = options;
        if(choiceA || choiceB || choiceC || choiceD){
            const randomId = (Math.random() * 1e32).toString(36);

            answers += getAnswerTemplate(randomId, choiceA, 'A');
            answers += getAnswerTemplate(randomId, choiceB, 'B');
            answers += getAnswerTemplate(randomId, choiceC, 'C');
            answers += getAnswerTemplate(randomId, choiceD, 'D');
        }
        answers += `</div>`;

        return `
            <div class="rounded-lg h-full flex-shrink-0 text-md flex flex-col justify-between items-center space-y-5 border-2 bg-gradient-to-br from-${options.theme}-600 via-${options.theme}-500 to-${options.theme}-500 text-white"
                style="max-width:300px"
            >

                <p class="mt-3 px-3 font-black leading-normal text-center tracking-wide tracking-wider">
                    ${options.question}
                </p>

                ${answers}
            </div>
        `;
    }

    static label = 'Template Two';

    static preview = function () {
        const preview = TemplateTwo.doRender({
            theme: 'orange',
            question: "Which of these correctly portray 'Beyond the night' by french artist B. Voss?",
            choiceA: 'https://images.unsplash.com/photo-1593296618860-4cbcb8dafab2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE2MTY1fQ',
            choiceB: 'https://images.unsplash.com/photo-1580857433978-53c3acb51aa3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE2MTY1fQ',
            choiceC: 'https://images.unsplash.com/photo-1592916948459-69101ff4b06f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE2MTY1fQ',
            choiceD: 'https://images.unsplash.com/photo-1548093190-e40f9b1b4082?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE2MTY1fQ',
        });

        return `<div style="height: 340px">${preview}</div>`
    }
}

export default TemplateTwo;