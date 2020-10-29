class TemplateThree {
    static props = {
        theme: {
            defaultValue: 'blue',
            type: 'choice',
            choices: ['purple', 'green', 'orange', 'red', 'blue', 'pink']
        },
        image1: {
            defaultValue: null,
            type: 'image'
        },
        image2: {
            defaultValue: null,
            type: 'image'
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
        this.props = TemplateThree.props;
        this.values = values;
        this.render = () => TemplateThree.doRender(this.values);
    }

    static doRender(options) {
        function getAnswerTemplate(fieldName, answer, value){
            if(!answer || !answer.length) return '';

            const randomId = (Math.random() * 1e32).toString(36);

            return `
                <div class="flex w-full TemplateThreeAnswer">
                    <input type="radio" name="${fieldName}" id="${randomId}" class="hidden" value="${value}" />
                    <label for="${randomId}" class="bg-transparent border-2 border-white border-opacity-50 font-semibold px-2 py-1 rounded-md text-white text-sm tracking-wider uppercase w-full flex items-center">
                        ${answer}

                        <div class="ml-auto border-2 border-white border-opacity-50 rounded-full w-4 h-4" style="padding: 2px;">
                            <div class="w-full h-full rounded-full bg-white"></div>
                        </div>
                    </label>
                </div>
            `;
        }

        let answers = `<div class="w-full flex flex-col space-y-2">`;
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

                <div class="flex w-full h-40 mb-1 relative rounded-lg overflow-hidden bg-red-500">
                    <img style="clip-path: polygon(0 0, 50% 0, 45% 100%, 0 100%);" class="absolute inset-0 h-full w-full object-cover" src="${options.image1}" />
                    <img style="clip-path: polygon(50% 0, 100% 0, 100% 100%, 45% 100%);" class="absolute inset-0 h-full w-full object-cover" src="${options.image2}" />

                    <div class="absolute inset-0 m-auto border-2 border-white bg-${options.theme}-500 rounded-full w-10 h-10 flex items-center justify-center" style="right: 10px">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </div>
                </div>

                ${answers}
            </div>
        `;
    }

    static label = 'Template Three';

    static preview = function () {
        const preview = TemplateThree.doRender({
            theme: 'blue',
            image1: 'https://images.unsplash.com/photo-1547974996-050bf23b6196?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE2MTY1fQ',
            image2: 'https://images.unsplash.com/photo-1566313891923-24df87b1b29f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE2MTY1fQ',
            choiceA: "Bushwart",
            choiceB: "75% Wool",
            choiceC: "Jamaica",
            choiceD: "Sheila",
        });

        return `<div style="height: 340px">${preview}</div>`
    }
}

export default TemplateThree;