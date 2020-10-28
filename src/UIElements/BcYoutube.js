function processYoutubeUrl(options){
    var reg = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const src = options.url || options.source;
    var match = src.match(reg);

    if(!match || !match[2])
        return null;

    const videoId = match[2];

    return {
        videoPoster: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&controls=${options.controls ? 1: 0}&showinfo=0&enablejsapi=1`
    }
}

class BcYoutube {
    static props = {
        source: {
            defaultValue: null,
            type: 'youtube'
          },
          // caption: {
          //   defaultValue: 'Video caption goes here.',
          //   type: 'text'
          // },
          width: {
            defaultValue: "wide",
            type: 'choice',
            choices: ['normal', 'wide', 'full']
          },
          controls: {
            defaultValue: true,
            type: 'choice',
            choices: [true, false]
          },
          // ,
          // type: {
          //   defaultValue: "simple",
          //   type: 'choice',
          //   choices: ['simple', 'wrapped']
          // }
    }

    constructor(values) {
        this.props = BcYoutube.props;
        this.values = values;
        this.render = () => BcYoutube.doRender(this.values);
    }

    static doRender(options, showPreview) {
        const videoDetails = processYoutubeUrl(options);
        if(!videoDetails) return '';

        const { videoPoster, embedUrl } = videoDetails;
        
        let preview = '';
        if(options.type === 'wrapped' || showPreview)
            preview = `
                <img src="${videoPoster}" />
                <div class="cover layout center-center">
                    <button class="layout center-center">
                        <svg fill="#fff" width="56" height="56" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                    </button>
                </div>
            `;

        let iframe = '';
        let style = "";

        if(!showPreview)
            iframe= `
                <iframe width="100%" height="100%" 
                    src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        else
            style = "height: 150px;";

        // {'playing': !options.type || options.type === 'simple' || playing}

        return `
            <div class="video-iframe ${options.width} ${!options.type || options.type === 'simple' ? 'playing': ''}"
                style="${style}"
            >
                ${iframe}
                ${preview}
            </div>
        `;
    }

    static label = 'Youtube Video';
    static icon = '<svg viewBox="0 0 334.623 334.623" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m175.33 287.02c-7e-3 0 0 0 0 0-38.053 0-79.481-1.202-123.12-3.554-25.784-1.414-45.785-21.292-48.632-48.349-4.762-45.2-4.762-90.83 0-135.62 2.841-26.832 22.815-46.71 48.574-48.33 75.271-4.737 152.72-4.737 230.31 0 26.061 1.581 45.586 20.99 48.6 48.304 4.749 43.246 4.756 88.87 6e-3 135.63-2.744 27.038-22.25 46.472-48.535 48.356-33.079 2.364-69.147 3.566-107.2 3.566zm-8.901-226.56c-37.931 0-76.113 1.195-113.48 3.541-19.685 1.234-34.39 16.048-36.594 36.851-4.666 43.895-4.666 88.613 0 132.93 2.204 20.971 16.89 35.778 36.543 36.858 43.413 2.339 84.609 3.535 122.42 3.535 37.751 0 73.51-1.189 106.29-3.528 19.833-1.427 34.57-16.228 36.659-36.839 4.666-45.862 4.666-90.58 6e-3 -132.93-2.294-20.868-17.005-35.688-36.594-36.877-38.53-2.352-77.31-3.541-115.25-3.541zm-31.852 61.331v88.208l84.706-43.805-84.706-44.403z"/></svg>';

    static preview = function () {
        return BcYoutube.doRender({
            source: "https://youtu.be/dB4hP-QM5Q0",
            width: 'wide',
        }, true);
    }
}

export default BcYoutube;