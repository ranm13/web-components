class Tooltip extends HTMLElement{
    constructor(){
        super();
        this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipText = "default text";
        this.attachShadow({mode: 'open'}); //attached shadow dom tree
        this.shadowRoot.innerHTML=`
            <style>
                div{
                    font-weight: normal;
                    background-color: black;

                    color: white;
                    position: absolute;
                    z-index: 10;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0, 0 ,0, 0.26);
                }

                ::slotted(.highlighted){
                    border-bottom: 1px dotted red;
                } /* style the slotted data only to the first component*/

                :host{
                    position: relative;
                    /* background-color: grey;*/
                } /*style the host component*/
                
                :host-context(p){
                    font-weight: bold;
                }

                .icon{
                    border: 1px solid black;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>
            <slot>Some default</slot>
            <span class="icon">?</span>
            `;
    }

    connectedCallback(){
        if(this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text');
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    }

    disconnectedCallback(){
        this._tooltipIcon.removeEventListener("mouseenter",this._showTooltip);
        this._tooltipIcon.removeEventListener("mouseleave",this._hideTooltip);
    }

    attributeChangedCallback(name, oldVal, newVal){
        if(oldVal === newVal) return;
        if(name === "text" ){
            this._tooltipText = newVal;
        }
    }

    static get observedAttributes(){
        return ['text'];
    }

    _showTooltip(){
        this._tooltipContainer = document.createElement("div");
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip(){
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define("rm-tooltip", Tooltip); //by this you define your own html tag - built in js (the name must have dash - )
