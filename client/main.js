import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import 'jquery-mousewheel';

import './main.html';

camInfo = new ReactiveVar()
zoomPointer = new ReactiveVar(0)

Template.body.onRendered(() => {
    Meteor.call('ptzZoom', 0)
    $('#stage').on('mousewheel', function(event) {

        if (event.originalEvent.deltaY > 0 && zoomPointer.get() > 0) {
            console.log('POSITIVE');
            zoomPointer.set(zoomPointer.get() - 0.01666)
            Meteor.call('ptzZoom', zoomPointer.get())
        }
        if (event.originalEvent.deltaY < 0 && zoomPointer.get() < 1) {
            console.log('NEGATIVE');
            zoomPointer.set(zoomPointer.get() + 0.01666)
            Meteor.call('ptzZoom', zoomPointer.get())
        }
    });
})

Template.controller.helpers({
    zoom() {
        return zoomPointer.get() < 0.00001 ? 'OPEN' : (zoomPointer.get() * 30).toFixed(2)
    }
})

Template.generalInfo.helpers({
    camInfo() {
        return camInfo.get()
    },

    zoom() {
        return zoomPointer.get() == 0 ? '1' : parseInt(zoomPointer.get() * 30)
    }
})

Template.controller.events({
    'click #getInfo' (e) {
        e.preventDefault()
        Meteor.call('getInfo', (err, res) => {
            console.log(res);
            camInfo.set(res)
            $('.info').show()
            $('.stage').hide()
            Meteor.setTimeout(() => {
                camInfo.set('')
                $('.info').hide()
                $('.stage').show()
            }, 3000)
        })
    },

    'click #gotoHome' (e) {
        e.preventDefault()
        Meteor.call('gotoHome')
        zoomPointer.set(0)
    },

    'click #gotoLeft' (e) {
        e.preventDefault()
        Meteor.call('ptzMove', -0.1, 0, 0)
    },

    'click #gotoRight' (e) {
        e.preventDefault()
        Meteor.call('ptzMove', 0.1, 0, 0)
    },

    'click #gotoUp' (e) {
        e.preventDefault()
        Meteor.call('ptzMove', 0, 0.1, 0)
    },

    'click #gotoDown' (e) {
        e.preventDefault()
        Meteor.call('ptzMove', 0, -0.1, 0)
    }
})

Template.stage.events({
    'click #stage' (e) {
        var posX = $('#stage').offset().left,
            posY = $('#stage').offset().top;
        console.log('B = ' + (e.pageX - posX) + ' , ' + (e.pageY - posY));
        rangeX = [0, 640];
        valueX = (e.pageX - posX);
        normalX = flanNormal(valueX, rangeX[0], rangeX[1]);
        rangeY = [360, 0];
        valueY = (e.pageY - posY);
        normalY = flanNormal(valueY, rangeY[0], rangeY[1]);
        Meteor.call('ptzMove', normalX / 4.3, normalY / 2.42, 0)
    }
})

function flanNormal(position, min, max) {
    // Equation by Prof. Francisco Lancellote
    result = ((2 * position - 2 * min) - (max - min)) / (max - min)
    return result;
}