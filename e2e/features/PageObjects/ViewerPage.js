var ViewerPage = function () {
    var that = this;
    var ptor = browser;
    this.showdebug = true;
    this.showsteps = true;

    this.frameSwitchDelay = 1000;
    this.reactionDelay = 5000;
    this.pageLoadDelay = 5000;

    this.resetFrame = function(callback) {
        if(that.showdebug) { console.log('switching to viewer frame'); }
        ptor.switchTo().defaultContent().then(
            function() {
                that.sleep(that.frameSwitchDelay).then(
                    function() {
                        if (that.showdebug) { console.log('switching to frame[0]'); }
                        ptor.switchTo().frame(0).then(
                            function() {
                                if (that.showdebug) { console.log('switched'); }
                                if(typeof(callback) == "function") {
                                    callback();
                                }
                            });
                    });
            });
    };

    this.sleep = function(ms) {
        if(that.showdebug) { console.log('sleeping for ' + ms + 'ms'); }
        return ptor.sleep(ms);
    };

    this.find = function(css) {
        if(that.showdebug) { console.log('finding ' + css); }
        return element(protractor.By.css(css));
    };

    this.findAll = function(css) {
        if(that.showdebug) { console.log('finding all ' + css); }
        return element.all(protractor.By.css(css));
    };

    this.moreInformationButton = function () {
        return this.find('.rightPanel .expandButton');
    };

    this.moreInformationHeaders = function () {
        return this.findAll('.rightPanel .main .items .item .header');
    };

    this.moreInformationTexts = function () {
        return this.findAll('.rightPanel .main .items .item .text');
    };

    this.infoPanel = function(){
        return this.find('.rightPanel');
    };

    this.startCanvas = function() {
        return this.findAll('.openseadragon-canvas canvas');
    };

    this.searchText = function() {
        return this.find('.searchText');
    };

    this.goButton = function() {
        return this.find('.imageBtn.go');
    };

    this.navigationNextButton = function() {
        return this.find('.imageBtn.next');
    };

    this.navigationNextDisabledButton = function() {
        return this.find('.imageBtn.next.disabled');
    };

    this.navigationPrevButton = function() {
        return this.find('.imageBtn.prev');
    };

    this.navigationPrevDisabledButton = function() {
        return this.find('.imageBtn.prev.disabled');
    };

    this.selectedThumbnailLabels = function() {
        return this.findAll('.thumb.selected .label');
    };

    this.fullScreenButton = function() {
        return this.find('.imageBtn.fullScreen');
    };

    this.navigationFirstButton = function() {
        return this.find('.imageBtn.first');
    };

    this.navigationLastButton = function() {
        return this.find('.imageBtn.last');
    };

    this.canvasPrevButton = function() {
        return this.find('.paging.btn.prev');
    };

    this.canvasPrevDisabledButton = function() {
        return this.find('.paging.btn.prev.disabled');
    };

    this.canvasNextButton = function() {
        return this.find('.paging.btn.next');
    };

    this.canvasNextDisabledButton = function() {
        return this.find('.paging.btn.next.disabled');
    };

    this.contentsPanel = function() {
        return this.find('.leftPanel');
    };

    this.contentsPanelIndexTab = function() {
        return this.find('.leftPanel .main .tabs a.first');
    };

    this.contentsPanelIndexTabActivated = function() {
        return this.find('.leftPanel .main .tabs a.first.on');
    };

    this.contentsPanelIndexTabItems = function() {
        return this.findAll('.treeView .tree li');
    };

    this.contentsPanelIndexTabTreeExpansionToggles = function() {
        return this.findAll('.treeView .tree li div.toggle');
    };

    this.contentsPanelIndexTabTreeExpandedToggles = function() {
        return this.findAll('.treeView .tree li div.toggle.expanded');
    };

    this.contentsPanelIndexTabSubTrees = function() {
        return this.findAll('.treeView .tree li ul');
    };

    this.contentsPanelThumbnailIncreaseSizeButton = function() {
        return this.find('.leftPanel .galleryView .btn.size-up');
    };

    this.contentsPanelThumbnailDecreaseSizeButton = function() {
        return this.find('.leftPanel .galleryView .btn.size-down');
    };

    this.contentsPanelExpandThumbnailsButton = function() {
        return this.find('.leftPanel > .top > a.expandFullButton');
    };

    this.contentsPanelCollapseThumbnailsButton = function() {
        return this.find('.leftPanel > .top > div.collapseButton');
    };

    this.contentsPanelLoadedImages = function() {
        return this.findAll('.wrap.loaded > img');
    };

    this.contentsPanelSelectedLoadedThumbnail = function() {
        return this.find('.galleryView .thumb.selected > .wrap.loaded');
    };

    this.contentsPanelSelectedLoadedThumbnails = function() {
        return this.findAll('.galleryView .thumb.selected > .wrap.loaded');
    };

    this.contentsPanelThumbnails = function() {
        return this.findAll('.galleryView .thumb');
    };

    this.getThumbnailPanelWidth = function(widthSettingCallback) {
        if(that.showdebug) { console.log('getting thumbnail panel width'); }
        this.resetFrame(
            function() {
                that.contentsPanel().then(
                    function(leftPanel) {
                        if(that.showdebug) { console.log('will get width'); }
                        leftPanel.getCssValue('width').then(
                            function (w) {
                                if(that.showdebug) { console.log('got width: ' + w); }
                                widthSettingCallback(w.replace('px', ''));
                            });
                    });
            });
    };

    this.getThumbnailWidth = function(widthSettingCallback) {
        if(that.showdebug) { console.log('getting thumbnail width'); }
        this.resetFrame(
            function() {
                that.contentsPanelSelectedLoadedThumbnail().then(
                    function (thumbnail) {
                        if(that.showdebug) { console.log('will get width'); }
                        thumbnail.getCssValue('width').then(
                            function (w) {
                                if(that.showdebug) { console.log('got width: ' + w); }
                                widthSettingCallback(w.replace('px', ''));
                            });
                    });
            });
    };

    this.recursivelyExpandIndexItems = function(callback) {
        if(that.showdebug) { console.log('recursively expanding index items...'); }
        new ViewerPage().resetFrame(
            function() {
                that.contentsPanelIndexTabTreeExpansionToggles().then(
                    function(contentsPanelIndexTabTreeExpansionToggles) {
                        if(contentsPanelIndexTabTreeExpansionToggles.length > 0) {
                            for(var x = 0; x < contentsPanelIndexTabTreeExpansionToggles.length; x++) {
                                var toggle = contentsPanelIndexTabTreeExpansionToggles[x];
                                toggle.getAttribute('class').then(
                                    function(attributeClass) {
                                        if(attributeClass.indexOf('expanded') == -1) {
                                            if(that.showdebug) { console.log('clicking expand toggle'); }
                                            toggle.click().then(
                                                function() {
                                                    new ViewerPage().resetFrame(
                                                        function() {
                                                            that.contentsPanelIndexTabTreeExpansionToggles().then(
                                                                function(expansionToggles) {
                                                                    that.resetFrame(
                                                                        function() {
                                                                            that.contentsPanelIndexTabTreeExpandedToggles().then(
                                                                                function(expandedToggles) {
                                                                                    if(expandedToggles.length == expansionToggles.length) {
                                                                                        if(that.showdebug) { console.log('total toggles equals expanded toggles'); }
                                                                                        callback();
                                                                                    } else {
                                                                                        if(that.showdebug) { console.log('total toggles: ' + expansionToggles.length + ' expanded: ' + expandedToggles.length); }
                                                                                        if(that.showdebug) { console.log('recursing ... '); }
                                                                                        that.recursivelyExpandIndexItems(callback);
                                                                                    }
                                                                                });
                                                                        });
                                                                },
                                                                function() {
                                                                    callback.fail('could not find any expansion toggles');
                                                                });
                                                        });
                                                },
                                                function() {
                                                    callback.fail('clicking an expansion toggle failed');
                                                });
                                        }
                                    });
                            }
                        } else {
                            callback.fail('could not find any expansion toggles');
                        }
                    });
            });
    };
};

module.exports = ViewerPage;