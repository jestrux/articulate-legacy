class TemplateOne {
    static props = {
        theme: {
            defaultValue: 'purple',
            type: 'choice',
            choices: ['purple', 'green', 'orange', 'red', 'blue', 'pink']
        },
        image: {
            defaultValue: null,
            type: 'image'
        },
        question: {
            defaultValue: 'Enter question here',
            type: 'long text'
        },
        choiceA: {
            defaultValue: 'Enter choice A value here',
            type: 'text'
        },
        choiceB: {
            defaultValue: 'Enter choice B value here',
            type: 'text'
        },
        choiceC: {
            defaultValue: 'Enter choice C value here',
            type: 'text'
        },
        choiceD: {
            defaultValue: 'Enter answer D value here',
            type: 'text'
        },
        answer: {
            defaultValue: null,
            type: 'choice',
            choices: ['A', 'B', 'C', 'D']
        },
    }

    constructor(values) {
        this.props = TemplateOne.props;
        this.values = values;
        this.render = () => TemplateOne.doRender(this.values);
    }

    static doRender(options) {
        function getAnswerTemplate(fieldName, answer, value){
            if(!answer || !answer.length) return '';

            const randomId = (Math.random() * 1e32).toString(36);

            return `
                <div class="flex w-full TemplateOneAnswer">
                    <input type="radio" name="${fieldName}" id="${randomId}" class="hidden" value="${value}" />
                    <label for="${randomId}" class="bg-transparent border border-white font-extrabold px-3 py-1 rounded-full text-white text-xs tracking-wider uppercase w-full text-center">
                        ${answer}
                    </label>
                </div>
            `;
        }

        let answers = `<div class="w-full grid grid-cols-2 gap-3">`;
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
            <div class="rounded-lg h-full flex-shrink-0 text-md p-3 flex flex-col justify-between items-center space-y-5 border-2 bg-gradient-to-br from-${options.theme}-600 via-${options.theme}-500 to-${options.theme}-500 text-white"
                style="max-width:300px"
            >

                <img class="rounded-lg h-40 w-full object-cover mb-3" src="${options.image}" />

                <p class="font-black leading-normal text-center tracking-wide tracking-wider">
                    ${options.question}
                </p>

                ${answers}
            </div>
        `;
    }

    static label = 'Template One';

    static preview = function () {
        const preview = TemplateOne.doRender({
            theme: 'purple',
            image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE2MTY1fQ',
            question: 'Based in silicon in Silicon valley, what is the name of the company that makes this computer?'
        });

        return `<div style="height: 340px">${preview}</div>`
    }
}

export default TemplateOne;