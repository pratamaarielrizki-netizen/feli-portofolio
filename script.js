/* =========================================================
   FELICIA INGRID
   WIZARDING PORTFOLIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           LOADER
        ===================================================== */

        const pageLoader =
            document.getElementById(
                "pageLoader"
            );


        window.addEventListener(
            "load",
            () => {

                setTimeout(
                    () => {

                        pageLoader.classList.add(
                            "hidden"
                        );

                    },
                    450
                );

            }
        );


        /* =====================================================
           NAVBAR
        ===================================================== */

        const navbar =
            document.getElementById(
                "navbar"
            );


        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 35
                ) {

                    navbar.classList.add(
                        "scrolled"
                    );

                } else {

                    navbar.classList.remove(
                        "scrolled"
                    );

                }

            },
            {
                passive: true
            }
        );


        /* =====================================================
           MOBILE MENU
        ===================================================== */

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );

        const navMenu =
            document.getElementById(
                "navMenu"
            );

        const navLinks =
            document.querySelectorAll(
                ".nav-link"
            );


        menuToggle.addEventListener(
            "click",
            () => {

                navMenu.classList.toggle(
                    "open"
                );

            }
        );


        navLinks.forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        navMenu.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );


        /* =====================================================
           REVEAL ANIMATION
        ===================================================== */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );


        /* =====================================================
           ACTIVE NAVIGATION
        ===================================================== */

        const sections =
            document.querySelectorAll(
                "main section[id]"
            );


        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                navLinks.forEach(
                                    link => {

                                        link.classList.remove(
                                            "active"
                                        );

                                        if (
                                            link.getAttribute(
                                                "href"
                                            ) ===
                                            `#${entry.target.id}`
                                        ) {

                                            link.classList.add(
                                                "active"
                                            );

                                        }

                                    }
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.35
                }
            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );


        /* =====================================================
           SPELLBOOK
        ===================================================== */

        const book =
            document.getElementById(
                "book"
            );

        const bookStage =
            document.getElementById(
                "bookStage"
            );

        const frontCover =
            document.getElementById(
                "frontCover"
            );

        const bookPrev =
            document.getElementById(
                "bookPrev"
            );

        const bookNext =
            document.getElementById(
                "bookNext"
            );

        const bookStatus =
            document.getElementById(
                "bookStatus"
            );

        const sheets =
            Array.from(
                document.querySelectorAll(
                    ".book-sheet"
                )
            );


        let currentPage = 0;

        let bookOpened = false;

        let bookBusy = false;


        const totalPages =
            sheets.length;


        function updateBookStack() {

            sheets.forEach(
                (
                    sheet,
                    index
                ) => {

                    sheet.style.zIndex =
                        String(
                            totalPages -
                            index
                        );

                }
            );


            frontCover.style.zIndex =
                bookOpened
                    ? "0"
                    : "100";

        }


        function updateBookStatus() {

            if (!bookOpened) {

                bookStatus.textContent =
                    "OPEN THE BOOK";

                return;

            }


            if (
                currentPage === 0
            ) {

                bookStatus.textContent =
                    "FIRST PAGE";

            } else if (
                currentPage >= totalPages
            ) {

                bookStatus.textContent =
                    "END OF ARCHIVE";

            } else {

                bookStatus.textContent =
                    `PAGE ${currentPage + 1} / ${totalPages}`;

            }

        }


        function openBook() {

            if (
                bookBusy ||
                bookOpened
            ) {

                return;

            }


            bookBusy = true;

            bookOpened = true;

            frontCover.classList.add(
                "open"
            );


            setTimeout(
                () => {

                    bookBusy = false;

                    updateBookStack();

                    updateBookStatus();

                },
                850
            );

        }


        function closeBook() {

            if (
                bookBusy ||
                !bookOpened
            ) {

                return;

            }


            if (
                currentPage > 0
            ) {

                resetBookPages(
                    () => {

                        frontCover.classList.remove(
                            "open"
                        );

                        bookOpened = false;

                        updateBookStack();

                        updateBookStatus();

                    }
                );

            } else {

                frontCover.classList.remove(
                    "open"
                );

                bookOpened = false;

                updateBookStack();

                updateBookStatus();

            }

        }


        function resetBookPages(
            callback
        ) {

            bookBusy = true;


            for (
                let i = sheets.length - 1;
                i >= 0;
                i--
            ) {

                sheets[i].classList.remove(
                    "flipped"
                );

            }


            setTimeout(
                () => {

                    currentPage = 0;

                    bookBusy = false;

                    if (
                        typeof callback ===
                        "function"
                    ) {

                        callback();

                    }

                },
                900
            );

        }


        function nextPage() {

            if (
                bookBusy
            ) {

                return;

            }


            if (
                !bookOpened
            ) {

                openBook();

                return;

            }


            if (
                currentPage >= totalPages
            ) {

                return;

            }


            const sheet =
                sheets[currentPage];


            if (!sheet) {

                return;

            }


            bookBusy = true;

            sheet.classList.add(
                "flipped"
            );


            currentPage++;


            setTimeout(
                () => {

                    bookBusy = false;

                    updateBookStack();

                    updateBookStatus();

                },
                900
            );

        }


        function previousPage() {

            if (
                bookBusy
            ) {

                return;

            }


            if (
                !bookOpened
            ) {

                return;

            }


            if (
                currentPage <= 0
            ) {

                closeBook();

                return;

            }


            const sheet =
                sheets[currentPage - 1];


            if (!sheet) {

                return;

            }


            bookBusy = true;

            sheet.classList.remove(
                "flipped"
            );


            currentPage--;


            setTimeout(
                () => {

                    bookBusy = false;

                    updateBookStack();

                    updateBookStatus();

                },
                900
            );

        }


        bookNext.addEventListener(
            "click",
            nextPage
        );


        bookPrev.addEventListener(
            "click",
            previousPage
        );


        frontCover.addEventListener(
            "click",
            openBook
        );


        /* =====================================================
           BOOK NEARBY OPEN
        ===================================================== */

        let nearbyTimer = null;


        bookStage.addEventListener(
            "mouseenter",
            () => {

                clearTimeout(
                    nearbyTimer
                );


                nearbyTimer =
                    setTimeout(
                        () => {

                            openBook();

                        },
                        180
                    );

            }
        );


        bookStage.addEventListener(
            "mouseleave",
            () => {

                clearTimeout(
                    nearbyTimer
                );

            }
        );


        /* =====================================================
           BOOK KEYBOARD
        ===================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextPage();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousPage();

                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeBook();

                }

            }
        );


        /* =====================================================
           BOOK TOUCH
        ===================================================== */

        let touchStartX = 0;

        book.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.touches[0].clientX;

            },
            {
                passive: true
            }
        );


        book.addEventListener(
            "touchend",
            event => {

                const touchEndX =
                    event.changedTouches[0].clientX;

                const difference =
                    touchEndX -
                    touchStartX;


                if (
                    Math.abs(difference) <
                    45
                ) {

                    return;

                }


                if (
                    difference < 0
                ) {

                    nextPage();

                } else {

                    previousPage();

                }

            },
            {
                passive: true
            }
        );


        updateBookStack();

        updateBookStatus();


        /* =====================================================
           LIGHTBOX
        ===================================================== */

        const lightbox =
            document.getElementById(
                "lightbox"
            );

        const lightboxImage =
            document.getElementById(
                "lightboxImage"
            );

        const lightboxClose =
            document.getElementById(
                "lightboxClose"
            );


        const memoryImages =
            document.querySelectorAll(
                ".memory-item img"
            );


        function openLightbox(
            image
        ) {

            lightboxImage.src =
                image.currentSrc ||
                image.src;

            lightboxImage.alt =
                image.alt || "Memory";

            lightbox.classList.add(
                "open"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        }


        function closeLightbox() {

            lightbox.classList.remove(
                "open"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow =
                "";

        }


        memoryImages.forEach(
            image => {

                image.addEventListener(
                    "click",
                    () => {

                        openLightbox(
                            image
                        );

                    }
                );

            }
        );


        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );


        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );


        /* =====================================================
           MUSIC PLAYER
        ===================================================== */

        const audio =
            document.getElementById(
                "audioPlayer"
            );

        const playButton =
            document.getElementById(
                "playButton"
            );

        const prevTrack =
            document.getElementById(
                "prevTrack"
            );

        const nextTrack =
            document.getElementById(
                "nextTrack"
            );

        const shuffleButton =
            document.getElementById(
                "shuffleButton"
            );

        const repeatButton =
            document.getElementById(
                "repeatButton"
            );

        const progressBar =
            document.getElementById(
                "progressBar"
            );

        const progressFill =
            document.getElementById(
                "progressFill"
            );

        const currentTime =
            document.getElementById(
                "currentTime"
            );

        const duration =
            document.getElementById(
                "duration"
            );

        const volumeSlider =
            document.getElementById(
                "volumeSlider"
            );

        const currentTitle =
            document.getElementById(
                "currentTitle"
            );

        const currentArtist =
            document.getElementById(
                "currentArtist"
            );

        const albumArtwork =
            document.getElementById(
                "albumArtwork"
            );

        const vinyl =
            document.getElementById(
                "vinyl"
            );

        const favoriteButton =
            document.getElementById(
                "favoriteButton"
            );

        const trackCounter =
            document.getElementById(
                "trackCounter"
            );

        const playlistItems =
            document.querySelectorAll(
                ".playlist-item"
            );


        const musicTracks = [

            {
                title:
                    "Midnight Letters",

                artist:
                    "The Night Archive",

                album:
                    "Midnight Letters",

                artwork:
                    "assets/photo-01.jpg",

                source:
                    "assets/music/midnight.mp3"

            },

            {
                title:
                    "Quiet Hours",

                artist:
                    "Velvet Morning",

                album:
                    "Quiet Hours",

                artwork:
                    "assets/photo-02.jpg",

                source:
                    "assets/music/quiet-hours.mp3"

            },

            {
                title:
                    "After Rain",

                artist:
                    "Silver September",

                album:
                    "After Rain",

                artwork:
                    "assets/photo-03.jpg",

                source:
                    "assets/music/after-rain.mp3"

            },

            {
                title:
                    "Letters Never Sent",

                artist:
                    "The Midnight Room",

                album:
                    "Letters Never Sent",

                artwork:
                    "assets/photo-04.jpg",

                source:
                    "assets/music/letters-never-sent.mp3"

            },

            {
                title:
                    "Velvet Skies",

                artist:
                    "The Night Archive",

                album:
                    "Velvet Skies",

                artwork:
                    "assets/photo-05.jpg",

                source:
                    "assets/music/velvet-skies.mp3"

            },

            {
                title:
                    "Golden Hour",

                artist:
                    "Velvet Morning",

                album:
                    "Golden Hour",

                artwork:
                    "assets/photo-06.jpg",

                source:
                    "assets/music/golden-hour.mp3"

            },

            {
                title:
                    "Moonlit Pages",

                artist:
                    "Silver September",

                album:
                    "Moonlit Pages",

                artwork:
                    "assets/photo-07.jpg",

                source:
                    "assets/music/moonlit-pages.mp3"

            },

            {
                title:
                    "Falling Stars",

                artist:
                    "The Midnight Room",

                album:
                    "Falling Stars",

                artwork:
                    "assets/photo-08.jpg",

                source:
                    "assets/music/falling-stars.mp3"

            },

            {
                title:
                    "Old Photographs",

                artist:
                    "The Night Archive",

                album:
                    "Old Photographs",

                artwork:
                    "assets/photo-09.jpg",

                source:
                    "assets/music/old-photographs.mp3"

            },

            {
                title:
                    "Until Tomorrow",

                artist:
                    "Velvet Morning",

                album:
                    "Until Tomorrow",

                artwork:
                    "assets/photo-10.jpg",

                source:
                    "assets/music/until-tomorrow.mp3"

            }

        ];


        let currentTrack =
            0;

        let shuffle =
            false;

        let repeat =
            false;

        let favorite =
            false;


        audio.volume =
            Number(
                volumeSlider.value
            );


        function formatTime(
            seconds
        ) {

            if (
                !Number.isFinite(seconds)
            ) {

                return "00:00";

            }


            const minutes =
                Math.floor(
                    seconds / 60
                );

            const remaining =
                Math.floor(
                    seconds % 60
                );


            return (
                String(minutes)
                    .padStart(2, "0")
                +
                ":"
                +
                String(remaining)
                    .padStart(2, "0")
            );

        }


        function updatePlaylist() {

            playlistItems.forEach(
                (
                    item,
                    index
                ) => {

                    item.classList.toggle(
                        "active",
                        index === currentTrack
                    );

                }
            );

        }


        function loadTrack(
            index,
            shouldPlay = false
        ) {

            if (
                !musicTracks[index]
            ) {

                return;

            }


            currentTrack =
                index;


            const track =
                musicTracks[
                    currentTrack
                ];


            currentTitle.textContent =
                track.title;

            currentArtist.textContent =
                track.artist;

            albumArtwork.src =
                track.artwork;

            audio.src =
                track.source;

            audio.load();


            trackCounter.textContent =
                `${String(currentTrack + 1).padStart(2, "0")} / ${String(musicTracks.length).padStart(2, "0")}`;


            progressFill.style.width =
                "0%";

            currentTime.textContent =
                "00:00";

            duration.textContent =
                "00:00";


            updatePlaylist();


            if (
                shouldPlay
            ) {

                playAudio();

            }

        }


        function playAudio() {

            const promise =
                audio.play();


            if (
                promise !== undefined
            ) {

                promise.catch(
                    () => {

                        /*
                         Audio can be blocked by the
                         browser until the user clicks.
                        */

                    }
                );

            }

        }


        function pauseAudio() {

            audio.pause();

        }


        function togglePlay() {

            if (
                audio.paused
            ) {

                playAudio();

            } else {

                pauseAudio();

            }

        }


        function updatePlayState() {

            if (
                audio.paused
            ) {

                playButton.textContent =
                    "▶";

                vinyl.classList.remove(
                    "playing"
                );

            } else {

                playButton.textContent =
                    "Ⅱ";

                vinyl.classList.add(
                    "playing"
                );

            }

        }


        function nextMusicTrack() {

            let nextIndex;


            if (
                shuffle
            ) {

                if (
                    musicTracks.length <= 1
                ) {

                    nextIndex =
                        currentTrack;

                } else {

                    do {

                        nextIndex =
                            Math.floor(
                                Math.random() *
                                musicTracks.length
                            );

                    } while (
                        nextIndex ===
                        currentTrack
                    );

                }

            } else {

                nextIndex =
                    currentTrack + 1;

                if (
                    nextIndex >=
                    musicTracks.length
                ) {

                    nextIndex = 0;

                }

            }


            loadTrack(
                nextIndex,
                true
            );

        }


        function previousMusicTrack() {

            let previousIndex =
                currentTrack - 1;


            if (
                previousIndex < 0
            ) {

                previousIndex =
                    musicTracks.length - 1;

            }


            loadTrack(
                previousIndex,
                true
            );

        }


        playButton.addEventListener(
            "click",
            togglePlay
        );


        nextTrack.addEventListener(
            "click",
            nextMusicTrack
        );


        prevTrack.addEventListener(
            "click",
            previousMusicTrack
        );


        shuffleButton.addEventListener(
            "click",
            () => {

                shuffle =
                    !shuffle;

                shuffleButton.style.color =
                    shuffle
                        ? "var(--gold)"
                        : "";

            }
        );


        repeatButton.addEventListener(
            "click",
            () => {

                repeat =
                    !repeat;

                repeatButton.style.color =
                    repeat
                        ? "var(--gold)"
                        : "";

            }
        );


        favoriteButton.addEventListener(
            "click",
            () => {

                favorite =
                    !favorite;

                favoriteButton.textContent =
                    favorite
                        ? "♥"
                        : "♡";

            }
        );


        playlistItems.forEach(
            item => {

                item.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                item.dataset.index
                            );


                        if (
                            Number.isInteger(
                                index
                            )
                        ) {

                            loadTrack(
                                index,
                                true
                            );

                        }

                    }
                );

            }
        );


        audio.addEventListener(
            "play",
            updatePlayState
        );


        audio.addEventListener(
            "pause",
            updatePlayState
        );


        audio.addEventListener(
            "timeupdate",
            () => {

                if (
                    audio.duration
                ) {

                    const percentage =
                        (
                            audio.currentTime /
                            audio.duration
                        ) * 100;


                    progressFill.style.width =
                        `${percentage}%`;

                    currentTime.textContent =
                        formatTime(
                            audio.currentTime
                        );

                }

            }
        );


        audio.addEventListener(
            "loadedmetadata",
            () => {

                duration.textContent =
                    formatTime(
                        audio.duration
                    );

            }
        );


        audio.addEventListener(
            "ended",
            () => {

                if (
                    repeat
                ) {

                    audio.currentTime =
                        0;

                    playAudio();

                } else {

                    nextMusicTrack();

                }

            }
        );


        audio.addEventListener(
            "error",
            () => {

                duration.textContent =
                    "—";

            }
        );


        progressBar.addEventListener(
            "click",
            event => {

                if (
                    !audio.duration
                ) {

                    return;

                }


                const rect =
                    progressBar.getBoundingClientRect();


                const percentage =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                audio.currentTime =
                    percentage *
                    audio.duration;

            }
        );


        volumeSlider.addEventListener(
            "input",
            () => {

                audio.volume =
                    Number(
                        volumeSlider.value
                    );

            }
        );


        loadTrack(
            0,
            false
        );


        /* =====================================================
           ESCAPE FOR LIGHTBOX
        ===================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeLightbox();

                }

            }
        );


        /* =====================================================
           BROKEN IMAGE FALLBACK
        ===================================================== */

        document
            .querySelectorAll("img")
            .forEach(
                image => {

                    image.addEventListener(
                        "error",
                        () => {

                            image.style.background =
                                "#c8b594";

                        }
                    );

                }
            );


    }
);