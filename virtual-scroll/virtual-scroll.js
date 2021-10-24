"use strict";
// import { fromEvent } from "rxjs";
// import { debounceTime } from "rxjs/operators";
const container = document.getElementById("container");
const virtualChildren = new Array(100000)
    .fill({})
    .map((item, index) => ({
    title: "Item " + index,
    content: "Some content",
}));
if (container) {
    const children = container?.children;
    const childHeight = 65;
    const windowSize = 10;
    const tolerance = 1;
    let firstChildIndex = 0;
    let lastChildIndex = windowSize + tolerance;
    container.style.height = childHeight * windowSize + "px";
    const insertChild = (childtoAdd, where) => {
        const child = document.createElement("custom-child");
        child.setAttribute("title", childtoAdd.title);
        child.setAttribute("content", childtoAdd.content);
        child.style.height = childHeight + "px";
        requestAnimationFrame(() => where === "begin"
            ? container.prepend(child)
            : container.appendChild(child));
    };
    for (let i = firstChildIndex; i < lastChildIndex + tolerance; i++) {
        insertChild(virtualChildren[i], "end");
    }
    const wheelHandler = (event) => {
        let lastMoment = 0;
        const moment = Date.now();
        if (moment - lastMoment < 500) {
            lastMoment = moment;
            return;
        }
        lastMoment = moment;
        console.warn(event);
        const scrollHandlerByDirection = {
            top: () => {
                console.log("Scroll Top");
                if (firstChildIndex === 0)
                    return;
                container.removeChild(children[children.length - 1]);
                firstChildIndex = firstChildIndex > 1 ? --firstChildIndex : 0;
                lastChildIndex =
                    lastChildIndex > windowSize ? --lastChildIndex : windowSize;
                insertChild(virtualChildren[firstChildIndex], "begin");
            },
            down: () => {
                console.log("Scroll Down");
                if (firstChildIndex === virtualChildren.length - 1)
                    return;
                container.removeChild(children[0]);
                firstChildIndex =
                    firstChildIndex < virtualChildren.length - windowSize
                        ? ++firstChildIndex
                        : virtualChildren.length - windowSize;
                lastChildIndex =
                    lastChildIndex < virtualChildren.length - 1
                        ? ++lastChildIndex
                        : virtualChildren.length;
                insertChild(virtualChildren[lastChildIndex], "end");
            },
        };
        const scrollDirection = event.deltaY > 0 ? "down" : "top";
        for (let index = 0; index < tolerance; index++) {
            scrollHandlerByDirection[scrollDirection]();
        }
        scrollHandlerByDirection[scrollDirection]();
    };
    container.onwheel = wheelHandler;
    //   fromEvent(container, "scroll")
    //     .pipe(debounceTime(300))
    //     .subscribe((event) => scrollHandler(event));
}
//# sourceMappingURL=virtual-scroll.js.map