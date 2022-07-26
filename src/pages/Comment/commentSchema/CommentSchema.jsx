
import React, { Fragment } from 'react'
export default class commentSchema extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ishighlighting: true,
            validUser: true,
            validText: true,
            validlikedislikeother:true,
            currentTitle: {
                id: 1,
                text: "sefesfseesf",
                title: "test",
                isdeleted: false
            },
            filteredtimelines: [],
            highlightetcommentstart: 3,
            highlightetcommentend: 5,
            selectStart: 3,
            selectEnd: 10,
            title: "toto"


        };
        this.selectStartChange = this.selectStartChange.bind(this);
        this.selectEndChange = this.selectEndChange.bind(this);
        this.selectedTextChange = this.selectedTextChange.bind(this);
        this.tidslinjerListChange = this.titleChange.bind(this);
        this.titleListChange = this.titleChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.filteredTimelineListChange = this.filteredTimelineListChange.bind(this);
        this.dislikesChange = this.dislikesChange.bind(this);
        this.likesChange = this.likesChange.bind(this);
        this.getChanges = this.getChanges.bind(this);
        this.addNewComment = this.addNewComment.bind(this);

        this.likeYesRef = React.createRef(null);
        this.dislikeYesRef = React.createRef(null);
        this.likeDislikeNoRef = React.createRef(null);
        this.userRef = React.createRef(null);
        this.textRef = React.createRef(null);
    }
    selectStartChange = (selectStart) => () => {
        this.props.selectStartChangeCallback(selectStart)


    }
    getChanges = () => {
        this.props.getChangesCallback();
    }
    selectEndChange = (selectedEnd) => () => {
        this.props.selectedEndChangeCallback(selectedEnd)
    }

    likesChange = (likes) => {
        this.props.likesChangeCallback(likes);
    }
    dislikesChange = (dislikes) => {
        this.props.dislikesChangeCallback(dislikes);
    }

    selectedTextChange = (selectedText) => () => {
        this.props.selectedTextChangeCallback(selectedText)
    }

    commandTidslinjeWrapperChange = (commandTidslinjeWrapper) => () => {
        this.props.commandTidslinjeWrapperCallback(commandTidslinjeWrapper)
    }

    tidslinjerListChange = (tidslinjerList) => () => {
        this.props.tidslinjerListCallback(tidslinjerList)
    }


    titleListChange = (titleList) => () => {
        this.props.titleListCallback(titleList)
    }



    titleChange = (title) => () => {
        this.props.titleChangeCallback(title)
    }



    filteredTimelineListChange = (tidslinjerList) => () => {
        this.props.tidslinjerListCallback(tidslinjerList)
    }

    addNewComment = () => {
        let tidslinje = {
            id: -1, 
            user: this.userRef.current.value,
            timestampCreated: new Date().valueOf(),
            timestampChanged: new Date().valueOf(),
            start: this.props.selectStart,
            end: this.props.selectEnd,
            text: this.textRef.current.value.trim(),
            like: this.likeYesRef.current.checked,
            dislike: this.dislikeYesRef.current.checked,
            isdeleted: false,
            texttocommentid: JSON.parse(this.props.title).id
        }

     //   this.getChanges();
        //Add timeline
       // axios.post("")
         //   .then(res => {

                //Get changes
          //      axios.post("")
          //          .then(res2 => {

          //          })
         //   });
    }

    render() {
        return (
            <Fragment>
                <p class="h3" style={{ marginTop: '10px' }} >Commenting following text </p>


                <div id="isCommenting" style={{ overflowY: 'auto', width: '320px', height: '220px', marginTop: '10px' }} readonly>
                    <span style={{ backgroundColor: 'white', color: 'black' }}>{JSON.parse(this.props.title).text.substring(0, this.props.selectStart) }</span>
                    <span style={{ backgroundColor: 'lightskyblue', color: 'black' }}>{JSON.parse(this.props.title).text.substring(this.props.selectStart, this.props.selectEnd) }</span>
                    <span style={{ backgroundColor: 'white', color: 'black' }}>{JSON.parse(this.props.title).text.substring(this.props.selectEnd, JSON.parse(this.props.title).text.length) }</span>
                </div>
                <p class="h3" style={{ marginTop: '10px' }} >Create a comment </p>
                <section id="kommentar">
               
                    <div class="form-group">

                        <label for="commentUser"> User: </label>
                            <input class="form-control input-sm w-25" formControlName="user" ref={this.userRef} id="commentUser" placeholder=" user" /><br/>
                            {!this.state.validUser && <span style={{color:'red'}} > Wrong input</span> }
                    </div>
                    <div class="form-group">
                        <label for="commentComment"> Comment: </label>
                            <textarea class="form-control input-sm w-25" formControlName="text" id="commentComment" ref={this.textRef} placeholder="Comment" rows="10"></textarea>
                            {!this.state.validText && <span style={{ color: 'red' }} > Wrong input</span> }
                </div>

                <div class="form-group">
                    <header> Do I like this part of text?</header>
                    <div>
                                <label for="likeYes">Like:</label> <input formControlName="likedislikeother" value="like" ref={this.likeYesRef}  type="radio" id="likeYes" name="likedislikeother"/>  <br/>
                                <label for="dislikeYes">Dislike:</label> <input formControlName="likedislikeother" ref={this.dislikeYesRef}  value="dislike" type="radio" id="dislikeYes" name="likedislikeother"/><br/>
                                <label for="likeDislikeNo">Don't know:</label>  <input formControlName="likedislikeother" ref={this.likeDislikeNoRef}  value="dontknow" type="radio" id="likeDislikeNo" name="likedislikeother" checked/><br/>
                                {!this.state.validlikedislikeother && <span style={{ color: 'red' }} > Wrong input</span>}
                      </div>

                            </div>
                                <div class="row">
                            <button id="addTimeline" onClick={this.addNewComment} class="btn btn-success col-1 m-1 p-1"><div class="text-wrap">Comment text</div></button>
                            </div>
                



                        </section>
            </Fragment>
        );
    }

}

