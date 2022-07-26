
import  CommentList  from "./commentList/CommentList.jsx"
import  CommentSchema  from "./commentSchema/CommentSchema.jsx"
import CommentSearchInfo from "./commentSearchInfo/CommentSearchInfo.jsx"
import TitleSearch from "./titleSearch/titleSearch.jsx"
import axios from 'axios';
import React, { Fragment } from 'react'

export class FenwFeatureTree {
    size;
    tree= [];
    constructor(size) {
        this.size = size
        this.tree = []
        for (let i = 0; i < size; i++) {
            this.tree[i] = 0
        }
    }

    update(timeSlot, val) {
        if (timeSlot == 0) return //must start at 1
        while (timeSlot < this.size) {
            this.tree[timeSlot] += val
            timeSlot += timeSlot & (-timeSlot)
        }
    }



     query(timeSlot) {

            let returnVal = 0;

            while (timeSlot > 0) {
                returnVal += this.tree[timeSlot]
                timeSlot -= timeSlot & (-timeSlot)
            }
         return returnVal;
    }


     rangeQuery(l, r) {
        let ret = this.query(l - 1) - this.query(r)
        return ret
    }

    addTimeline(start, end) {
        //Inside, prefix sum adds 1 because it encounters slot=start
        this.update(start, 1);

        //When going outisde timeline (end+1), one add -1 to remember one dont longer
        //have added +1 when encountered start.
        // Only going to use prefix sum to count number of timelines that I am standing on, so
        // no range query needed
        //
        //--OFF TOPIC---
        //Range query gives then prefix sum to end - prefix sum to start:
        //NB! not needed for this class
        // (rangequery start inside timeline, rangequery end outside timeline): (1+(-1)) - 1 = -1
        // (rangequery start inside timeline, rangequery end inside timeline):  (1+0) - 1 = 0
        // (rangequery start outside timeline, rangequery end outside timeline):  (1+(-1)) - 0 = 0-0 =0
        // (rangequery start outside timeline, rangequery end inside timeline):  (1+0) - 0 = 1-0 =1
        //Because all timelines inside follow same logic, sum becomes 0.
        this.update(end + 1, -1);

    }
    //Do reverse update compared to adding
    removeTimeline(start, end) {
        this.update(start, -1);
        this.update(end + 1, 1);
    }

    getCountingList(start, stop) {
        let res = []

        for (let i = start; i <= stop; i++) {
            res.push(this.query(i))
        }
        return res;
    }





}

export default class Comment extends React.Component {

       constructor(props) {
        super(props);
        this.state = {
            ishighlighting: true,
            validUser: true,
            validText: true,
            validlikedislikeother: true,
            currentTitle: {
                id: 1,
                text: "",
                title: "test",
                isdeleted: false
            },
            tidslinjerList: [{ "id": 2, "user": "ddd", "start": 3, "end": 4, "text": "setset", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 5, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 6, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 7, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 8, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 9, "user": "ff", "text": "ff", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 10, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 11, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 12, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 15, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 16, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 17, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 23, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 24, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 25, "user": "EE", "text": "EEE", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 26, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 28, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 29, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 30, "user": "ff", "text": "ff", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 1 }, { "id": 31, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 32, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 33, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 34, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 35, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 36, "user": "", "timestampCreated": 1656871687619, "timestampChanged": 1656871687619, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 39, "user": "wtwt", "timestampCreated": 1656871790359, "timestampChanged": 1656871790359, "start": 0, "end": 753, "text": "1", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 41, "user": "", "timestampCreated": 1656872582130, "timestampChanged": 1656872582130, "start": 445, "end": 548, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 43, "user": "", "timestampCreated": 1656883410281, "timestampChanged": 1656883410281, "start": 633, "end": 711, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 44, "user": "", "timestampCreated": 1656883424718, "timestampChanged": 1656883424718, "start": 645, "end": 676, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 45, "user": "", "timestampCreated": 1656925390178, "timestampChanged": 1656925390178, "start": 445, "end": 577, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 46, "user": "ddd", "timestampCreated": 1656929431971, "timestampChanged": 1656929431971, "start": 347, "end": 389, "text": "dd", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 47, "user": "ddd", "timestampCreated": 1656929490743, "timestampChanged": 1656929490743, "start": 203, "end": 288, "text": "dd", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 48, "user": "ee", "timestampCreated": 1656930010787, "timestampChanged": 1656930010787, "start": 566, "end": 606, "text": "ee", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 49, "user": "", "timestampCreated": 1656959612556, "timestampChanged": 1656959612556, "start": 719, "end": 753, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 50, "user": "", "timestampCreated": 1656959885027, "timestampChanged": 1656959885027, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 52, "user": "", "timestampCreated": 1656960358400, "timestampChanged": 1656960358400, "start": 7, "end": 10, "text": "", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 54, "user": "", "timestampCreated": 1657017836736, "timestampChanged": 1657017842241, "start": 594, "end": 678, "text": "", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 1 }, { "id": 60, "user": "e", "timestampCreated": 1657025642195, "timestampChanged": 1657025642195, "start": 4, "end": 8, "text": "ee", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 61, "user": "e", "timestampCreated": 1657025670929, "timestampChanged": 1657025670929, "start": 4, "end": 7, "text": "ee", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 62, "user": "", "timestampCreated": 1657025793726, "timestampChanged": 1657025793726, "start": 5, "end": 9, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 63, "user": "ee", "timestampCreated": 1657025811350, "timestampChanged": 1657025811350, "start": 5, "end": 9, "text": "fe", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 68, "user": "rrr", "timestampCreated": 1657026114523, "timestampChanged": 1657026114523, "start": 5, "end": 8, "text": "rrr", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 69, "user": "rrr", "timestampCreated": 1657026172542, "timestampChanged": 1657026172542, "start": 3, "end": 10, "text": "rrr", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 72, "user": "", "timestampCreated": 1657045474172, "timestampChanged": 1657045474172, "start": 5, "end": 8, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 76, "user": "ee", "timestampCreated": 1657047289818, "timestampChanged": 1657047289818, "start": 8, "end": 10, "text": "ee", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 1 }, { "id": 73, "user": "", "timestampCreated": 1657045541981, "timestampChanged": 1657055068370, "start": 0, "end": 10, "text": "", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 1 }],

            filteredtimelines:[],
            highlightetcommentstart: 10,
            highlightetcommentend: 0,
            selectStart: 0,
            selectEnd: 10,
            selectedText: "",
            title: JSON.stringify({
                id: 1,
                text: "",
                title: "test",
                isdeleted: false
            }),
            titleList: [],
            likes: 0,
            dislikes: 0,
            countingList:[],
            fenw: new FenwFeatureTree(1),
            timestamp: new Date().valueOf()


           };
           this.selectStartChange = this.selectStartChange.bind(this);
           this.selectEndChange = this.selectEndChange.bind(this);
           this.selectedTextChange = this.selectedTextChange.bind(this);

           this.tidslinjerListChange = this.tidslinjerListChange.bind(this);
           this.titleListChange = this.titleListChange.bind(this);
           this.titleChange = this.titleChange.bind(this);
           this.filteredTimelineListChange = this.filteredTimelineListChange.bind(this);
           this.dislikesChange = this.dislikesChange.bind(this);
           this.likesChange = this.likesChange.bind(this);

           this.getChanges = this.getChanges.bind(this);
           this.doChange = this.doChange.bind(this);
           this.state.titleList = ["twtw", "trett", "sjokolade", "TEST"]
    }


    selectStartChange = (selectStart) => {
        this.setState({
            selectStart: selectStart
        });
        

    }
    //Will make this a callback, and send it to childs.
    doChange(commandTidslinjeWrapper) {
        let nytidslinjeListe = JSON.parse(JSON.stringify(this.state.tidslinjerList));

        commandTidslinjeWrapper.forEach((commandtidslinjen) => {


            //  console.log("Got command " + commandtidslinjen.command + " with timeline:" + JSON.stringify(commandtidslinjen.tidslinje))
            if (String(commandtidslinjen.command) == "ADD") {
                console.log("Supposed to do changes to timelines here. ADD ")
                let tidslinjen = JSON.parse(JSON.stringify(commandtidslinjen.tidslinje));
                nytidslinjeListe.push(tidslinjen);
                if (commandtidslinjen.tidslinje && commandtidslinjen.tidslinje.start && commandtidslinjen.tidslinje.end)
                    this.state.fenw.addTimeline(commandtidslinjen.tidslinje.start, commandtidslinjen.tidslinje.end)

                //Notify change to parrent, such that everyone now that we have a new tidslinje


            }
            else if (String(commandtidslinjen.command) == "CHANGE") {

                console.log("Supposed to do changes to timelines here. CHANGE ")
                let index = nytidslinjeListe.findIndex((x) => { return x.id == commandtidslinjen.tidslinje.id})
                nytidslinjeListe.splice(index, 1, commandtidslinjen.tidslinje)

                // console.log("State of tidslinje array: " + JSON.stringify(this.tidslinjerList));

            }
            else if (String(commandtidslinjen.command) == "REMOVE") {
                let index = nytidslinjeListe.findIndex((x) => { return x.id == commandtidslinjen.tidslinje.id })

                nytidslinjeListe.splice(index, 1)
                console.log("Supposed to do changes to timelines here. REMOVE ")
                if (commandtidslinjen.tidslinje && commandtidslinjen.tidslinje.start && commandtidslinjen.tidslinje.end)
                    this.state.fenw.removeTimeline(commandtidslinjen.tidslinje.start, commandtidslinjen.tidslinje.end)



            }

        })
        //change to a updated version
        this.tidslinjerListChange(nytidslinjeListe);


        //let nyFiltered: tidslinje[] = this.filterListByTime(this.selectStart.getValue().valueOf(), this.selectEnd.getValue().valueOf(), this.percent.getValue().valueOf());
       // this.filteredtimelines.next(nyFiltered);

       // let likes: Number = this.countLikes(this.selectStart.getValue().valueOf(), this.selectEnd.getValue().valueOf(), this.percent.getValue());
       // let dislikes: Number = this.countDisLikes(this.selectStart.getValue().valueOf(), this.selectEnd.getValue().valueOf(), this.percent.getValue());
        //this.changelikes(likes);
       // this.changedislikes(dislikes);
    }
  
    selectEndChange = (selectedEnd) => {
        console.log(selectedEnd)
        this.setState({
            selectEnd: selectedEnd
        });

    }

    likesChange = (likes) => {
        this.setState({
            likes: likes
        });
    }
    dislikesChange = (dislikes) => {
        this.setState({
            dislikes: dislikes
        });
    }

    selectedTextChange = (selectedText) => {
        this.setState({
            selectedText: selectedText
        });
    }

    commandTidslinjeWrapperChange = (commandTidslinjeWrapper) => {
        this.setState({
            commandTidslinjeWrapper: commandTidslinjeWrapper
        });
    }

    tidslinjerListChange = (tidslinjerList) => {
        this.setState({
            tidslinjerList: tidslinjerList
        });

        for (const [key, timeline] of Object.entries(tidslinjerList)) {
            this.state.fenw.addTimeline(timeline.start, timeline.end);
        }


    }
   

    titleListChange = (titleList) => {
        this.setState({
            titleList: titleList
        });
      
    }

    getChanges() {
        console.log("I am getting changes");
        let testCommand = "REMOVE";
        let testID = 1;
        let testTidslinje = { "id": testID, "user": "RR", "timestampCreated": 1657545938272, "timestampChanged": 1657545938272, "start": 0, "end": 10, "text": "RRR", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }
        let commandTidslinjeWrapper = [];

        if (testCommand == "REMOVE")
            commandTidslinjeWrapper = [{ "command": "REMOVE", "tidslinje": { "id": testID, "user": "RR", "timestampCreated": 1657545938272, "timestampChanged": 1657545938272, "start": 0, "end": 10, "text": "RRR", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 } }];
        else if (testCommand == "ADD")
            commandTidslinjeWrapper = [{ "command": "ADD", "tidslinje": testTidslinje }];
        else if (testCommand == "CHANGE")
            commandTidslinjeWrapper = [{ "command": "CHANGE", "tidslinje": testTidslinje }];

        else
            return;

        this.setState({ timestamp: new Date().valueOf() })
        this.doChange(commandTidslinjeWrapper)
    }

    titleChange = (title) => {
     
        this.setState({
            title: title,
            fenw: new FenwFeatureTree(JSON.parse(title).text.length)
        });

        let database = [[{ "id": 2, "user": "ddd", "start": 3, "end": 4, "text": "setset", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 5, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 6, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 7, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 8, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 9, "user": "ff", "text": "ff", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 10, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 11, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 12, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 15, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 16, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 17, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 23, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 24, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 25, "user": "EE", "text": "EEE", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 26, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 28, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 29, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 30, "user": "ff", "text": "ff", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 1 }, { "id": 31, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 32, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 33, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 34, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 35, "user": "", "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 36, "user": "", "timestampCreated": 1656871687619, "timestampChanged": 1656871687619, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 39, "user": "wtwt", "timestampCreated": 1656871790359, "timestampChanged": 1656871790359, "start": 0, "end": 753, "text": "1", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 41, "user": "", "timestampCreated": 1656872582130, "timestampChanged": 1656872582130, "start": 445, "end": 548, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 43, "user": "", "timestampCreated": 1656883410281, "timestampChanged": 1656883410281, "start": 633, "end": 711, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 44, "user": "", "timestampCreated": 1656883424718, "timestampChanged": 1656883424718, "start": 645, "end": 676, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 45, "user": "", "timestampCreated": 1656925390178, "timestampChanged": 1656925390178, "start": 445, "end": 577, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 46, "user": "ddd", "timestampCreated": 1656929431971, "timestampChanged": 1656929431971, "start": 347, "end": 389, "text": "dd", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 47, "user": "ddd", "timestampCreated": 1656929490743, "timestampChanged": 1656929490743, "start": 203, "end": 288, "text": "dd", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 48, "user": "ee", "timestampCreated": 1656930010787, "timestampChanged": 1656930010787, "start": 566, "end": 606, "text": "ee", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 49, "user": "", "timestampCreated": 1656959612556, "timestampChanged": 1656959612556, "start": 719, "end": 753, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 50, "user": "", "timestampCreated": 1656959885027, "timestampChanged": 1656959885027, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 52, "user": "", "timestampCreated": 1656960358400, "timestampChanged": 1656960358400, "start": 7, "end": 10, "text": "", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 54, "user": "", "timestampCreated": 1657017836736, "timestampChanged": 1657017842241, "start": 594, "end": 678, "text": "", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 1 }, { "id": 60, "user": "e", "timestampCreated": 1657025642195, "timestampChanged": 1657025642195, "start": 4, "end": 8, "text": "ee", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 61, "user": "e", "timestampCreated": 1657025670929, "timestampChanged": 1657025670929, "start": 4, "end": 7, "text": "ee", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 62, "user": "", "timestampCreated": 1657025793726, "timestampChanged": 1657025793726, "start": 5, "end": 9, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 63, "user": "ee", "timestampCreated": 1657025811350, "timestampChanged": 1657025811350, "start": 5, "end": 9, "text": "fe", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 68, "user": "rrr", "timestampCreated": 1657026114523, "timestampChanged": 1657026114523, "start": 5, "end": 8, "text": "rrr", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 69, "user": "rrr", "timestampCreated": 1657026172542, "timestampChanged": 1657026172542, "start": 3, "end": 10, "text": "rrr", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 72, "user": "", "timestampCreated": 1657045474172, "timestampChanged": 1657045474172, "start": 5, "end": 8, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 1 }, { "id": 76, "user": "ee", "timestampCreated": 1657047289818, "timestampChanged": 1657047289818, "start": 8, "end": 10, "text": "ee", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 1 }, { "id": 73, "user": "", "timestampCreated": 1657045541981, "timestampChanged": 1657055068370, "start": 0, "end": 10, "text": "", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 1 }]
            , [{ "id": 65, "user": "ee", "timestampCreated": 1657025872857, "timestampChanged": 1657025872857, "start": 1, "end": 4, "text": "fe", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 8 }, { "id": 70, "user": "rrrAAA", "timestampCreated": 1657026196337, "timestampChanged": 1657026196337, "start": 2, "end": 5, "text": "rrrr", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 8 }, { "id": 57, "user": "test", "timestampCreated": 1657022085859, "timestampChanged": 1657026221187, "start": 0, "end": 3, "text": "TREFFE", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 8 }]
            , [{ "id": 115, "user": "", "timestampCreated": 1657112083402, "timestampChanged": 1657112083402, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 77, "user": "", "timestampCreated": 1657047785473, "timestampChanged": 1657047785473, "start": 854, "end": 862, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 78, "user": "", "timestampCreated": 1657053876939, "timestampChanged": 1657053876939, "start": 289, "end": 363, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 79, "user": "wfwf", "timestampCreated": 1657054446306, "timestampChanged": 1657054446306, "start": 795, "end": 864, "text": "wfwf", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 80, "user": "wfwf", "timestampCreated": 1657054458472, "timestampChanged": 1657054458472, "start": 234, "end": 379, "text": "wfwfwww", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 81, "user": "wfwf", "timestampCreated": 1657054476016, "timestampChanged": 1657054476016, "start": 528, "end": 798, "text": "wfwfwww", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 9 }, { "id": 82, "user": "wfwf", "timestampCreated": 1657054489167, "timestampChanged": 1657054489167, "start": 664, "end": 735, "text": "wfwfwww", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 83, "user": "wfwf", "timestampCreated": 1657054498762, "timestampChanged": 1657054498762, "start": 735, "end": 802, "text": "wfwfwww", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 84, "user": "wfwf11", "timestampCreated": 1657054507045, "timestampChanged": 1657054507045, "start": 591, "end": 733, "text": "wfwfwww", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 85, "user": "wfwf11", "timestampCreated": 1657054514643, "timestampChanged": 1657054514643, "start": 596, "end": 735, "text": "wfwfwwwr", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 87, "user": "e", "timestampCreated": 1657099017972, "timestampChanged": 1657099017972, "start": 307, "end": 315, "text": "e", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 89, "user": "", "timestampCreated": 1657106356135, "timestampChanged": 1657106356135, "start": 623, "end": 630, "text": "", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 9 }, { "id": 90, "user": "", "timestampCreated": 1657110729228, "timestampChanged": 1657110729228, "text": "", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 9 }, { "id": 91, "user": "", "timestampCreated": 1657110756079, "timestampChanged": 1657110756079, "start": 0, "end": 19, "text": "", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 9 }, { "id": 93, "user": "v", "timestampCreated": 1657110875825, "timestampChanged": 1657110875825, "start": 19, "end": 27, "text": "vv", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 94, "user": "rar", "timestampCreated": 1657110900200, "timestampChanged": 1657110900200, "start": 19, "end": 27, "text": "vv", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 95, "user": "tran", "timestampCreated": 1657110968731, "timestampChanged": 1657110968731, "start": 2, "end": 18, "text": "vvss", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 96, "user": "", "timestampCreated": 1657111391758, "timestampChanged": 1657111391758, "start": 250, "end": 258, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 97, "user": "", "timestampCreated": 1657111597796, "timestampChanged": 1657111597796, "start": 18, "end": 28, "text": "D", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 98, "user": "DD", "timestampCreated": 1657111703262, "timestampChanged": 1657111703262, "start": 323, "end": 400, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 116, "user": "", "timestampCreated": 1657112083601, "timestampChanged": 1657112083601, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 99, "user": "", "timestampCreated": 1657112077317, "timestampChanged": 1657112077317, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 100, "user": "", "timestampCreated": 1657112077708, "timestampChanged": 1657112077708, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 101, "user": "", "timestampCreated": 1657112077892, "timestampChanged": 1657112077892, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 102, "user": "", "timestampCreated": 1657112078065, "timestampChanged": 1657112078065, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 103, "user": "", "timestampCreated": 1657112078277, "timestampChanged": 1657112078277, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 104, "user": "", "timestampCreated": 1657112078432, "timestampChanged": 1657112078432, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 105, "user": "", "timestampCreated": 1657112078647, "timestampChanged": 1657112078647, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 106, "user": "", "timestampCreated": 1657112078825, "timestampChanged": 1657112078825, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 107, "user": "", "timestampCreated": 1657112079211, "timestampChanged": 1657112079211, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 108, "user": "", "timestampCreated": 1657112079448, "timestampChanged": 1657112079448, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 109, "user": "", "timestampCreated": 1657112079662, "timestampChanged": 1657112079662, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 110, "user": "", "timestampCreated": 1657112079792, "timestampChanged": 1657112079792, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 111, "user": "", "timestampCreated": 1657112079988, "timestampChanged": 1657112079988, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 112, "user": "", "timestampCreated": 1657112080249, "timestampChanged": 1657112080249, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 113, "user": "", "timestampCreated": 1657112080401, "timestampChanged": 1657112080401, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 114, "user": "", "timestampCreated": 1657112083194, "timestampChanged": 1657112083194, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 117, "user": "", "timestampCreated": 1657112083795, "timestampChanged": 1657112083795, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 118, "user": "", "timestampCreated": 1657112083942, "timestampChanged": 1657112083942, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 119, "user": "", "timestampCreated": 1657112084509, "timestampChanged": 1657112084509, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 120, "user": "", "timestampCreated": 1657112084721, "timestampChanged": 1657112084721, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 121, "user": "", "timestampCreated": 1657112084913, "timestampChanged": 1657112084913, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 122, "user": "", "timestampCreated": 1657112085078, "timestampChanged": 1657112085078, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 123, "user": "", "timestampCreated": 1657112085267, "timestampChanged": 1657112085267, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 124, "user": "", "timestampCreated": 1657112085511, "timestampChanged": 1657112085511, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 125, "user": "", "timestampCreated": 1657112085782, "timestampChanged": 1657112085782, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 126, "user": "", "timestampCreated": 1657112085980, "timestampChanged": 1657112085980, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 127, "user": "", "timestampCreated": 1657112086178, "timestampChanged": 1657112086178, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 128, "user": "", "timestampCreated": 1657112086372, "timestampChanged": 1657112086372, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 129, "user": "", "timestampCreated": 1657112086560, "timestampChanged": 1657112086560, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 130, "user": "", "timestampCreated": 1657112086984, "timestampChanged": 1657112086984, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 131, "user": "", "timestampCreated": 1657112087218, "timestampChanged": 1657112087218, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 132, "user": "", "timestampCreated": 1657112087428, "timestampChanged": 1657112087428, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 133, "user": "", "timestampCreated": 1657112087648, "timestampChanged": 1657112087648, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 134, "user": "", "timestampCreated": 1657112092871, "timestampChanged": 1657112092871, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 135, "user": "", "timestampCreated": 1657112093083, "timestampChanged": 1657112093083, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 136, "user": "", "timestampCreated": 1657112093459, "timestampChanged": 1657112093459, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 137, "user": "", "timestampCreated": 1657112093698, "timestampChanged": 1657112093698, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 138, "user": "", "timestampCreated": 1657112093891, "timestampChanged": 1657112093891, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 139, "user": "", "timestampCreated": 1657112094054, "timestampChanged": 1657112094054, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 140, "user": "", "timestampCreated": 1657112094271, "timestampChanged": 1657112094271, "start": 854, "end": 863, "text": "", "like": false, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 141, "user": "D", "timestampCreated": 1657112131372, "timestampChanged": 1657112131372, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 142, "user": "D", "timestampCreated": 1657112131667, "timestampChanged": 1657112131667, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 143, "user": "D", "timestampCreated": 1657112131802, "timestampChanged": 1657112131802, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 144, "user": "D", "timestampCreated": 1657112131995, "timestampChanged": 1657112131995, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 145, "user": "D", "timestampCreated": 1657112132316, "timestampChanged": 1657112132316, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 146, "user": "D", "timestampCreated": 1657112134785, "timestampChanged": 1657112134785, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 147, "user": "D", "timestampCreated": 1657112134957, "timestampChanged": 1657112134957, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 148, "user": "D", "timestampCreated": 1657112135146, "timestampChanged": 1657112135146, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 149, "user": "D", "timestampCreated": 1657112137937, "timestampChanged": 1657112137937, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 150, "user": "D", "timestampCreated": 1657112138118, "timestampChanged": 1657112138118, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 151, "user": "D", "timestampCreated": 1657112138314, "timestampChanged": 1657112138314, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 152, "user": "D", "timestampCreated": 1657112142472, "timestampChanged": 1657112142472, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 153, "user": "D", "timestampCreated": 1657112142668, "timestampChanged": 1657112142668, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 154, "user": "D", "timestampCreated": 1657112147019, "timestampChanged": 1657112147019, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 155, "user": "D", "timestampCreated": 1657112147220, "timestampChanged": 1657112147220, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 156, "user": "D", "timestampCreated": 1657112149616, "timestampChanged": 1657112149616, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 157, "user": "D", "timestampCreated": 1657112149788, "timestampChanged": 1657112149788, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 158, "user": "D", "timestampCreated": 1657112152284, "timestampChanged": 1657112152284, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 159, "user": "D", "timestampCreated": 1657112152488, "timestampChanged": 1657112152488, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 160, "user": "D", "timestampCreated": 1657112156270, "timestampChanged": 1657112156270, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 161, "user": "D", "timestampCreated": 1657112156577, "timestampChanged": 1657112156577, "start": 888, "end": 894, "text": "DD", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 9 }, { "id": 75, "user": "set", "timestampCreated": 1657045727323, "timestampChanged": 1657134776541, "start": 214, "end": 223, "text": "set", "like": false, "dislike": true, "isdeleted": false, "texttocommentid": 9 }]
            , [{ "id": 163, "user": "33333", "timestampCreated": 1657140339864, "timestampChanged": 1657140339864, "start": 239, "end": 430, "text": "TEST", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 10 }, { "id": 164, "user": "Per", "timestampCreated": 1657140456793, "timestampChanged": 1657140456793, "start": 1552, "end": 1595, "text": "Dette var en bra setning :D", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 10 }, { "id": 165, "user": "y", "timestampCreated": 1657141099800, "timestampChanged": 1657141099800, "start": 19954, "end": 22477, "text": "y", "like": true, "dislike": false, "isdeleted": false, "texttocommentid": 10 }]]

        let tidslinjerList = database.filter(x => x[0].texttocommentid == JSON.parse(title).id)[0]

        this.setState({ timestamp: new Date().valueOf() })

        //Load list of timelines
        this.tidslinjerListChange(tidslinjerList)

        this.setState({
            countingList: this.state.fenw.getCountingList(0, JSON.parse(title).text.length)
        })
        console.log(this.state.countingList)
       
               //Get new title info
        //axios.post("")
        //    .then(res => {
        //    })  
    }




    filteredTimelineListChange = (filteredtimelines) => {
        this.setState({
            filteredtimelines: filteredtimelines
        });
    }

    render() {
        return (
            <Fragment>
                <main>



                    <div class="container">
                        <div>
                            <TitleSearch
                                selectStart={this.state.selectStart}
                                selectEnd={this.state.selectEnd}
                                selectText={this.state.selectedText}
                                tidslinjerList={this.state.tidslinjerList}
                                titleList={this.state.titleList}
                                title={this.state.title}
                                filteredtimelines={this.state.filteredtimelines}
                                likes={this.state.likes}
                                dislikes={this.state.dislikes}
                                countingList={this.state.countingList}

                                likesChangeCallback={this.likesChange}
                                dislikesChangeCallback={this.dislikesChange}
                                selectStartChangeCallback={this.selectStartChange}
                                selectEndChangeCallback={this.selectEndChange}
                                selectedTextChangeCallback={this.selectedTextChange}
                                commandTidslinjeWrapperChangeCallback={this.commandTidslinjeWrapperChange}
                                tidslinjerListChangeCallback={this.tidslinjerListChange}
                                titleListChangeCallback={this.titleListChange}
                                titleChangeCallback={this.titleChange}
                                filteredTimelineListChangeCallback={this.filteredTimelineListChange}
                                getChangesCallback={this.getChanges }
                            ></TitleSearch>
                            <CommentSearchInfo
                                selectStart={this.state.selectStart}
                                selectEnd={this.state.selectEnd}
                                selectText={this.state.selectedText}
                                tidslinjerList={this.state.tidslinjerList}
                                titleList={this.state.titleList}
                                title={this.state.title}
                                filteredtimelines={this.state.filteredtimelines}
                                likes={this.state.likes}
                                dislikes={this.state.dislikes}
                                countingList={this.state.countingList}

                                getChangesCallback={this.getChanges}
                                likesChangeCallback={this.likesChange}
                                dislikesChangeCallback={this.dislikesChange}
                                selectStartChangeCallback={this.selectStartChange}
                                selectEndChangeCallback={this.selectEndChange}
                                selectedTextChangeCallback={this.selectedTextChange}
                                commandTidslinjeWrapperChangeCallback={this.commandTidslinjeWrapperChange}
                                tidslinjerListChangeCallback={this.tidslinjerListChange}
                                titleListChangeCallback={this.titleListChange}
                                titleChangeCallback={this.titleChange}
                                filteredTimelineListChangeCallback={this.filteredTimelineListChange}>
                                </CommentSearchInfo>
                            <CommentSchema

                                selectStart={this.state.selectStart}
                                selectEnd={this.state.selectEnd}
                                selectText={this.state.selectedText}
                                tidslinjerList={this.state.tidslinjerList}
                                titleList={this.state.titleList}
                                title={this.state.title}
                                filteredtimelines={this.state.filteredtimelines}
                                likes={this.state.likes}
                                dislikes={this.state.dislikes}
                                countingList={this.state.countingList}

                                getChangesCallback={this.getChanges}
                                likesChangeCallback={this.likesChange}
                                dislikesChangeCallback={this.dislikesChange}
                                selectStartChangeCallback={this.selectStartChange}
                                selectEndChangeCallback={this.selectEndChange}
                                selectedTextChangeCallback={this.selectedTextChange}
                                commandTidslinjeWrapperChangeCallback={this.commandTidslinjeWrapperChange}
                                tidslinjerListChangeCallback={this.tidslinjerListChange}
                                titleListChangeCallback={this.titleListChange}
                                titleChangeCallback={this.titleChange}
                                filteredTimelineListChangeCallback={this.filteredTimelineListChange}>
                            </CommentSchema>
                        </div>

                        <CommentList

                            selectStart={this.state.selectStart}
                            selectEnd={this.state.selectEnd}
                            selectText={this.state.selectedText}
                            tidslinjerList={this.state.tidslinjerList}
                            titleList={this.state.titleList}
                            title={this.state.title}
                            filteredtimelines={this.state.filteredtimelines}
                            likes={this.state.likes}
                            dislikes={this.state.dislikes}
                            countingList={this.state.countingList}

                            getChangesCallback={this.getChanges}
                            likesChangeCallback={this.likesChange}
                            dislikesChangeCallback={this.dislikesChange}
                        selectStartChangeCallback={this.selectStartChange}
                        selectEndChangeCallback={this.selectEndChange}
                        selectedTextChangeCallback={this.selectedTextChange}
                        commandTidslinjeWrapperChangeCallback={this.commandTidslinjeWrapperChange}
                        tidslinjerListChangeCallback={this.tidslinjerListChange}
                        titleListChangeCallback={this.titleListChange}
                        titleChangeCallback={this.titleChange}
                        filteredTimelineListChangeCallback={this.filteredTimelineListChange}>

                    </CommentList>
                    </div>
                </main>
            </Fragment>
 )
    }

}

