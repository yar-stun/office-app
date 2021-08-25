$(function () {

    /* Index menu */
    $(".header__toggle--hidden").on("click", function (event) {
        event.preventDefault();
        $(this).toggleClass("active");
        $(".header").toggleClass("menu-active");
        $("#header__nav").toggleClass("active");
        $("#header__nav").addClass("anim--active");
        $("body").toggleClass("nonescroll");
    });

    /*Translate*/
    $('.header__translate').click(function () {
        $(this).toggleClass('open');
    });

    $('.header__translate-button').click(function () {
        var dataLangSelect = $(this).data('lang');
        $('.header__translate').attr('data-location', dataLangSelect);
        $('.header__translate-button').removeClass('active');
        $(this).toggleClass('active');
    });

    /* Account menu */
    $(".header__toggle-account").on("click", function (event) {
        event.preventDefault();
        $(this).toggleClass("active");
        $(".account__sidebar ").toggleClass("active");
        $(".account__sidebar ").addClass("anim");
        $(".page--account").toggleClass("active");
        $(".account__content").toggleClass("active");
    });

    const menu = document.querySelector('.account__sidebar');
    const mobileBack = document.querySelector('.mobile-back');

    const initialMenu = () => {
        document.querySelector('.account__menu--dropdown').classList.remove('transformation');
        document.querySelector('.account__sidebar').querySelector('.account__menu').classList.remove('transformation');
    }

    if (menu) {
        menu.addEventListener('click', (e) => {
            if (e.target.classList.contains('account__menu-link--drop')) {
                e.preventDefault();
                e.target.closest('.account__menu').classList.add('transformation');
                e.target.closest('.account__menu-item').querySelector('.account__menu--dropdown').classList.add('transformation');
            }

            if (e.target.classList.contains('mobile-content__back')) {
                e.preventDefault();
                e.target.closest('.account__menu--dropdown').classList.remove('transformation');
                e.target.closest('.account__sidebar').querySelector('.account__menu').classList.remove('transformation');
            }

        });
    }

    /* Modal */
    $(".modal").each(function () {
        $(this).wrap('<div class="modal__overlay"></div>')
    });

    $(".open-modal").on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation;
        var $this = $(this),
            modal = $($this).data("modal");
        $(".modal__overlay").removeClass("open");
        $(modal).parents(".modal__overlay").addClass("open");
        setTimeout(function () {
            $(modal).addClass("open");
            $("body").addClass("nonescroll");
        }, 350);

        $(document).on('click', function (e) {
            var target = $(e.target);
            if ($(target).hasClass("modal__overlay")) {
                $(target).find(".modal").each(function () {
                    $(this).removeClass("open");
                });
                setTimeout(function () {
                    $(target).removeClass("open");
                    if (!$(".header__nav").hasClass('active')) {
                        $("body").removeClass("nonescroll");
                    }
                }, 350);
            }
        });

    });

    $(".modal__close").on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation;
        var $this = $(this),
            modal = $($this).data("modal");
        $(modal).removeClass("open");
        setTimeout(function () {
            $(modal).parents(".modal__overlay").removeClass("open");
            if (!$(".header__nav").hasClass('active')) {
                $("body").removeClass("nonescroll");
            }
        }, 350);

    });

    function closeModal(modal) {
        modal.removeClass("open");
        setTimeout(function () {
            modal.parents(".modal__overlay").removeClass("open");
            if (!$(".header__nav").hasClass('active')) {
                $("body").removeClass("nonescroll");
            }
        }, 350);
    }

    /* Отправка заявки */
    $("#form__modal").submit(function () {
        $.ajax({
            type: "POST",
            url: "assets/php/post-modal.php",
            data: $(this).serialize()
        }).done(function () {
            $(".modal__massage").addClass("active").css('display', 'flex').hide().fadeIn();
            setTimeout(function () {
                jQuery("#form__modal").trigger("reset");
                $(".modal__massage").removeClass('active').fadeOut();
            }, 3000);
        });
        return false;
    });

    /*Form*/
    $(".form__btn").on('click', function () {
        $("#form__modal").find('.form__input').each(function () {
            if ($(this).val() != '') {
                $(".form__error").removeClass('active');
            } else {
                $(".form__error").addClass('active');
            }
        });
    });

    /*Маска для инпута*/
    var telInp = $('input[type="tel"]');
    telInp.each(function () {
        $(this).mask("+7 (999) 999-99-99");
    });

    /*Info*/
    $(".about__info span").hover(function () {
        $(this).parent().children(".info__box").toggleClass('active');
    });

    /*File*/
    $('#choosefile').bind('change', function () {
        var filename = $("#choosefile").val();
        if (/^\s*$/.test(filename)) {
            $(".file-upload").removeClass('active');
            $("#nofile").text("Файл не выбран...");
        } else {
            $(".file-upload").addClass('active');
            $("#nofile").text(filename.replace("C:\\fakepath\\", ""));
        }
    });

    /*File*/
    $('#addfile').bind('change', function () {
        var filename = $("#addfile").val();
        if (/^\s*$/.test(filename)) {
            $(".task__file-img").removeClass('active');
            $("#addfilename").val('');
        } else {
            $(".task__file-img").addClass('active');
            $("#addfilename").val(filename.replace("C:\\fakepath\\", ""));
        }
    });

    /*Sms code*/
    $('.number__input:first-child').focus();
    $('.number__input').on('keyup', function (e) {
        let value = $(this).val();
        let len = value.length;
        let curTabIndex = parseInt($(this).attr('tabindex'));
        let nextTabIndex = curTabIndex + 1;
        let prevTabIndex = curTabIndex - 1;
        if (len > 0) {
            $(this).val(value.substr(0, 1));
            $('[tabindex=' + nextTabIndex + ']').focus();
        } else if (len == 0 && prevTabIndex !== 0) {
            $('[tabindex=' + prevTabIndex + ']').focus();
        }
    });

    /*Autoresize*/
    const textArea = document.querySelectorAll('.resize__input');

    textArea.forEach(function (item) {
        let textAreaHeight = item.offsetHeight;

        item.addEventListener('input', function (event) {
            let $this = event.target;

            $this.style.height = textAreaHeight + 'px';
            $this.style.height = ($this.scrollHeight + 2) + 'px';
        });
    });

    /*Dialog open button*/
    const dialogBtn = document.querySelector('.dialog__option-btn');

    if (dialogBtn) {
        dialogBtn.addEventListener('click', function (event) {
            event.preventDefault();
            event.target.closest('.dialog__option').classList.toggle('open');
            event.currentTarget.classList.toggle('active');
        });
    }

    /* Account Active Peaple */
    $(".specialists__content").on("click", function (event) {
        $(".specialists__content").removeClass("active");
        $(".specialists__item-before").removeClass("active");
        $(".specialists__item-hover").removeClass("hidden-name");
        $(this).children(".specialists__item-before").addClass("active");
        $(this).children(".specialists__item-hover").addClass("hidden-name");
        $(this).addClass("active");
    });

    /* Account Active Min Peaple */
    $(".specialists-min__item").on("click", function (event) {
        $(".specialists-min__item").removeClass("active");
        $(this).addClass("active");
    });

    /*Checklist active*/
    $('.checklist__content-label').on('click', function (e) {
        if (!$(this).children('.checklist__content-info').hasClass('edit')) {
            $(this).toggleClass('active');
        }
    });

    /*Open notification*/
    $(".notification-open").on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $(".notification").toggleClass('active');
        $(".notification").addClass('anim');
    });

    /*Open attach*/
    $(".staff__attach---show").on('click', function () {
        $(".staff__attach-sidebar").toggleClass('attach');
    });

    /*Open and Close Chat*/
    $(".dialog__prev-hidden").on('click', function () {
        $(this).toggleClass("active");
        if ($(".messenger__list-default")) {
            $(".messenger__list-default").toggleClass('open');
        }
        if ($(".messenger__list-min")) {
            $(".messenger__list-min").toggleClass('open');
        }
        if ($(".dialog-default")) {
            $(".dialog-default").toggleClass('open');
        }
    });

    $(".messenger__list-default .messages__list li a").on('click', function (e) {
        e.preventDefault();
        $('.dialog__prev-hidden').removeClass("active");
        $(".messenger__list-default").toggleClass('open');
        $(".dialog-default").toggleClass('open');
    });

    /*Open and Close Statistics*/
    $(".statistics-mobile__btn--next").on('click', function () {
        $(".department__statistics").addClass('open');
    });

    $(".statistics-mobile__btn--prev").on('click', function () {
        $(".department__statistics").removeClass('open');
    });

    /*Open and Close Position*/
    $(".office-position__open").on('click', function () {
        $(".office-position").addClass('open');
    });

    $(".office-position__close").on('click', function () {
        $(".office-position").removeClass('open');
    });

    /*Open Rates*/
    $(".rates-open").on('click', function () {
        $(".rates__table-item--mobile").addClass('show');
        $(this).addClass('hidden');
    });

    /*Open List*/
    $(".account__attached-dropdown").on('click', function () {
        $(this).toggleClass('active');
    });

    /*Open Profile Content*/
    $(".employee__menu-item a").on('click', function (e) {
        e.preventDefault();
        $(".profile-employee__content").addClass('open');
    });

    $(".profile-employee-prev").on('click', function (e) {
        e.preventDefault();
        $(".profile-employee__content").removeClass('open');
    });

    /* Profile info Edit */
    $(".profile__info-edit").click(function () {
        var $this = $(this);
        var profileInputs = $(".profile__info-list input");
        if (!$this.hasClass("edit")) {
            $this.addClass("edit");

            profileInputs.addClass('edit').attr("readonly", false);
            profileInputs.eq(0).focus();
        } else {
            $this.removeClass("edit");
            profileInputs.removeClass('edit').attr("readonly", "readonly");
        }
    });


    /*Open Material*/
    $(".projects__steps-material").on('click', function () {
        $(this).toggleClass('active');
        $(this).parent().parent().children(".projects__steps-hidden").slideToggle(200);
    });

    /*Show info rates*/
    $(".payrates__info").hover(function () {
        $(this).parent().children(".payrates__info-box").toggleClass('active');
    });

    /*Open Tools*/
    $(".vacancy__tools-add").click(function (event) {
        event.preventDefault();
        $(".vacancy__tools-hidden").slideDown();
    });

    /*Open Specialists*/
    $(".specs-add__list .specialists-add__item").click(function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    /*Select modal add item*/
    function selectDirectorModal(el) {
        let modal = $('#' + el.closest('.modal').attr('id'));
        closeModal(modal);
    }

    $('.director-add__item').click(function () {
        $('.director-add__item').not(this).removeClass('active');
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
        }

        selectDirectorModal($(this));
    });

    /*Open Links*/
    $(".office-link__item").click(function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    /*Open training*/
    $(".vacancy-training__item").click(function (event) {
        event.preventDefault();
        $(this).children('.vacancy-training__before').toggleClass('active');
    });

    /*Open partners*/
    $(".partners-open").click(function (event) {
        event.preventDefault();
        $('.partners__form').addClass('active');
    });

    /*Open storage add*/
    $(".storage__add-btn").click(function (event) {
        event.preventDefault();
        $(this).parent().toggleClass('active');
    });

    /*Open storage option*/
    $(".storage__dropdown-btn").click(function (event) {
        event.preventDefault();
        $(this).parent().toggleClass('active');
    });

    /*Request Button*/
    $(".search__company-request").on("click", function () {
        $(this).addClass('request');
        $(this).text('Запрос отправлен');
    });

    /*Preview Img*/
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.training__upload-label').addClass('active');
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imageUpload").change(function () {
        readURL(this);
    });

    /*Edit tasks*/
    $('.create-task__label--editable').click(function (e) {
        e.preventDefault();

        let editBox = $('.create-task__container--edit'),
            editBoxTaskText = editBox.find('textarea'),
            editBoxTaskName = editBox.find('input'),
            editBoxTaskPriority = editBox.find('.dropdown-custom__button span'),
            currItem = $(this).closest('.create-task__item'),
            currTaskName = currItem.find('.create-task-task-name').text(),
            currTaskText = currItem.find('.create-task__input--editable').val(),
            currTaskPriority = currItem.find('.create-task-task-priority span').text();

        if (!editBox.hasClass('is-open')) {
            editBox.addClass('is-open');
            editBoxTaskText.val(currTaskText);
            editBoxTaskName.val(currTaskName);
            editBoxTaskPriority.text(currTaskPriority);
        } else {
            editBoxTaskText.val(currTaskText);
            editBoxTaskName.val(currTaskName);
            editBoxTaskPriority.text(currTaskPriority);
        }
    });

    $('button.task__add').click(function (e) {
        e.preventDefault();
        $(this).closest('.create-task__container--edit').removeClass('is-open');
    });

    $('button.task__close').click(function (e) {
        e.preventDefault();
        let $this = $(this);
        $this.addClass('success').text('Сохранено!');
        setTimeout(function () {
            $this.closest('.create-task__container--edit').removeClass('is-open');
            $this.removeClass('success').text('Сохранить');
        }, 1500);
    });

    /*Add task btn*/
    let createTaskBox = $('.create-task__container--edit');
    $('.head-add-task').click(function (e) {
        e.preventDefault();
        if (!createTaskBox.hasClass('is-open')) {
            createTaskBox.addClass('is-open');
            createTaskBox.find('textarea').val("");
            createTaskBox.find('input').val("");
            createTaskBox.find('.dropdown-custom__button span').text("");
        } else {
            createTaskBox.find('textarea').val("");
            createTaskBox.find('input').val("");
            createTaskBox.find('.dropdown-custom__button span').text("");
        }
    });

    // Button Option
    document.querySelectorAll('.setting__option-list__item').forEach(function (dropDownWrapper) {
        const btnOption = dropDownWrapper.querySelector('.setting__option-btn');
        const dropdownOption = dropDownWrapper.querySelector('.setting__option-dropdown');
        const dropdownBtnOption = dropDownWrapper.querySelector('.dropdown__button');

        btnOption.addEventListener('click', function (e) {
            this.classList.add('active');
            this.nextElementSibling.classList.add('active');
        });

        document.addEventListener('click', function (e) {
            if (e.target !== btnOption && e.target !== dropdownBtnOption) {
                btnOption.classList.remove('active');
                dropdownOption.classList.remove('active');
            }
        });

    });

    /*Resume Button*/
    $(".registration__resume-btn").on("click", function (e) {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(".registration__resume-btn span").text('Резюме	составлено');
        }
    });

    $.fn.extend({
        toggleText: function (a, b) {
            return this.text(this.text() == a ? b : a);
        }
    });

    $(".registration__resume-btn").hover(function () {
        if ($(this).hasClass('active')) {
            $(".registration__resume-btn span").toggleText('Резюме составлено', 'Редактировать');

            if ($(".registration__resume-btn span").text() == 'Редактировать') {
                $(this).addClass('edit');
            } else {
                $(this).removeClass('edit');
            }
        }
    });

    /*Create File Button*/
    $(".create__file-add").on("click", function (e) {
        e.preventDefault();
        if (!$(this).hasClass('create__file-open')) {
            $(this).addClass('create__file-open');
            $(this).text('Открыто	');
        } else {
            $(this).removeClass('create__file-open');
            $(this).removeClass('create__file-close');
            $(this).text('Открыть');
        }
    });

    $.fn.extend({
        toggleText: function (a, b) {
            return this.text(this.text() == a ? b : a);
        }
    });

    $(".create__file-add").hover(function () {
        if ($(this).hasClass('create__file-open')) {
            $(this).toggleText('Открыто', 'Закрыть');

            if ($(this).text() == 'Закрыть') {
                $(this).addClass('create__file-close');
            } else {
                $(this).removeClass('create__file-close');
            }
        }
    });

    // Select
    document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
        const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
        const dropDownBtnText = dropDownWrapper.querySelector('.dropdown__button span');
        const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
        const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
        const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

        dropDownBtn.addEventListener('click', function (e) {
            dropDownList.classList.toggle('dropdown__list--visible');
            this.classList.toggle('dropdown__button--active');
        });

        dropDownListItems.forEach(function (listItem) {
            listItem.addEventListener('click', function (e) {
                e.stopPropagation();
                dropDownBtnText.innerText = this.innerText;
                dropDownBtn.focus();
                dropDownInput.value = this.dataset.value;
                dropDownList.classList.remove('dropdown__list--visible');
                dropDownBtn.classList.remove('dropdown__button--active');
            });
        });

        document.addEventListener('click', function (e) {
            if (e.target !== dropDownBtn) {
                dropDownBtn.classList.remove('dropdown__button--active');
                dropDownList.classList.remove('dropdown__list--visible');
            }
        });

    });

    // Custom Select
    document.querySelectorAll('.dropdown-custom').forEach(function (dropDownWrapper) {
        const dropDownBtn = dropDownWrapper.querySelector('.dropdown-custom__button');
        const dropDownBtnText = dropDownWrapper.querySelector('.dropdown-custom__button span');
        const dropDownList = dropDownWrapper.querySelector('.dropdown-custom__list');
        const dropDownListItems = dropDownList.querySelectorAll('.dropdown-custom__list-item');

        dropDownBtn.addEventListener('click', function (e) {
            dropDownList.classList.toggle('dropdown-custom__list--visible');
            this.classList.toggle('dropdown-custom__button--active');
        });

        dropDownListItems.forEach(function (listItem) {
            listItem.addEventListener('click', function (e) {
                e.stopPropagation();
                dropDownBtnText.innerText = this.innerText;
                dropDownBtn.focus();
                dropDownList.classList.remove('dropdown-custom__list--visible');
                dropDownBtn.classList.remove('dropdown-custom__button--active');
            });
        });

        document.addEventListener('click', function (e) {
            if (e.target !== dropDownBtn) {
                dropDownBtn.classList.remove('dropdown-custom__button--active');
                dropDownList.classList.remove('dropdown-custom__list--visible');
            }
        });

    });

    /*staff open fade*/
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var dropdownlink = this.el.find('.staff__toggle-btn');
        dropdownlink.on('click', {
                el: this.el,
                multiple: this.multiple
            },
            this.dropdown);
    };
    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el,
            $this = $(this),
            $next = $this.next();
        $next.fadeToggle(250);
        $this.toggleClass('active');
    }
    var accordion = new Accordion($('.staff__accordion'), false);

    /*Accrodeon open slide*/
    var AccordionSlide = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var dropdownlink = this.el.find('._slide');
        dropdownlink.on('click', {
                el: this.el,
                multiple: this.multiple
            },
            this.dropdown);
    };
    AccordionSlide.prototype.dropdown = function (e) {
        var $el = e.data.el,
            $this = $(this),
            $next = $this.next();
        $next.slideToggle(250);
        $this.parent().toggleClass('active');
    }
    var accordionSlide = new AccordionSlide($('.rates__faq-list'), false);

    /*Tabs*/
    $('.tabs__btn').click(function (event) {
        event.preventDefault();
        if (!$(this).hasClass('active')) {
            $('.tabs__btn').removeClass('active');
            $(this).toggleClass("active");
            $('.tabs__content-box').hide();
            var href = $(this).attr('href');
            $(href).fadeIn();
        }
    });

    /*Sub Tabs*/
    $('.subtabs__btn').click(function (event) {
        event.preventDefault();
        if (!$(this).hasClass('active')) {
            $('.subtabs__btn').removeClass('active');
            $(this).toggleClass("active");
            $('.subtabs__content-box').hide();
            var href = $(this).attr('href');
            $(href).fadeIn();
        }
    });

    /* Notes Edit */
    $(".chain__btn-edit").click(function () {
        var $this = $(this);
        if (!$this.hasClass("edit")) {
            $this.addClass("edit");
            $(".input-edit").attr("readonly", false);
            $(".input-edit").addClass("edit");
            $(".form__checkbox-notes span").addClass("show");
            $('.show-info').attr("disabled", false);
        } else {
            $this.removeClass("edit");
            $(".input-edit").attr("readonly", "readonly");
            $(".input-edit").removeClass("edit");
            $(".form__checkbox-notes span").removeClass("show");
            $('.show-info').attr("disabled", "disabled");
        }
    });

    if ($('.show-info').prop('checked')) {
        $(this).parent().parent().children(".notes-created__input").addClass('show');
    }

    $('.show-info:checkbox').change(function () {
        if ($(this).is(":checked")) {
            $(this).closest(".notes__box").children(".notes-created__input").addClass("show");
        } else {
            $(this).closest(".notes__box").children(".notes-created__input").removeClass("show");
        }
    }).change();

    /* Settings Edit */
    $(".button-edit").click(function () {
        var $this = $(this);
        if (!$this.hasClass("edit")) {
            $this.addClass("edit");
            $this.prev().addClass('edit').attr("readonly", false);
            ;
            $this.prev().focus();
        } else {
            $this.removeClass("edit");
            $this.prev().removeClass('edit').attr("readonly", "readonly");
            ;
        }
    });

    /* Checklist Edit */
    $(".checklist__btn-edit").click(function () {
        var $this = $(this);
        if (!$this.hasClass("edit")) {
            $this.addClass("edit");
            $this.parent().parent().parent().find(".checklist__item-name").addClass('edit').attr("readonly", false);
            $this.parent().parent().parent().parent().children(".checklist__item-body").children().children().children().children().addClass('edit').attr("readonly", false);
            $this.parent().parent().parent().parent().children(".checklist__item-body").children().find('.checklist__content-item--hidden').addClass('show');
        } else {
            $this.removeClass("edit");
            $this.parent().parent().parent().find(".checklist__item-name").removeClass('edit').attr("readonly", "readonly");
            $this.parent().parent().parent().parent().children(".checklist__item-body").children().children().children().children().removeClass('edit').attr("readonly", "readonly");
            $this.parent().parent().parent().parent().children(".checklist__item-body").children().find('.checklist__content-item--hidden').removeClass('show');
        }
    });

    /*Show schedule*/
    $('.show-schedule:checkbox').change(function () {
        if ($(this).is(":checked")) {
            $(".schedule-show").fadeOut();
        } else {
            $(".schedule-show").fadeIn();
        }
    }).change();

    /*Show meetings*/
    const meetingsChange = document.getElementById('meetings-change');
    const meetingsHidden = document.querySelectorAll('.meetings-hidden');

    if (meetingsChange) {
        meetingsChange.addEventListener('click', function (e) {
            meetingsHidden.forEach(function (item) {
                if (meetingsChange.checked) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }

    /*Show interview*/
    $('.settings__option-checkbox--interview:checkbox').change(function () {
        if ($(this).is(":checked")) {
            $(".staff-interview").addClass("staff-interview--hidden");
        } else {
            $(".staff-interview").removeClass("staff-interview--hidden");
        }
    }).change();

    /* Office Grid */
    $("#list, #map, #radio_3").change(function () {
        if ($("#list").is(":checked")) {
            $(".specialists__drag").addClass('list');
            $(".specialists").addClass('scroll__custom');
        } else if ($("#map").is(":checked")) {
            $(".specialists__drag").removeClass('list');
            $(".specialists").removeClass('scroll__custom');
        }
        // else
    });

    //Change Text
    const ratesAutopay = document.querySelector('.rates-autopay');
    if (ratesAutopay) {
        ratesAutopay.addEventListener('click', function () {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.innerText = 'Отключить автопродление платежей';
            } else {
                this.classList.add('active');
                this.innerText = 'Включить автопродление платежа';
            }
        });
    }
    ;

    /* Toggle Theme */
    let btn = document.querySelector('.theme__checkbox');

    function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
    }

    function toggleTheme() {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('default-theme');
        } else {
            setTheme('theme-dark');
        }
    }

    setTheme('default-theme');

    if (btn) {
        btn.addEventListener('click', (e) => {
            toggleTheme();
        });
    }


    /*Swipe*/
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const storageOption = document.querySelectorAll('.storage__item-option ');

    storageOption.forEach(function (item) {
        item.addEventListener('touchstart', function (event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        item.addEventListener('touchend', function (event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesture();
        }, false);

        function handleGesture() {
            if (touchendX <= touchstartX) {
                item.classList.add('active');
            }

            if (touchendX >= touchstartX) {
                item.classList.remove('active');
            }
        }
    });


    const sliderWrapper = document.querySelector('.swiper-wrapper');
    if (sliderWrapper) {
        /*Slider*/
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        /*Slider*/
        var swiper = new Swiper('.swiper-schedule', {
            slidesPerView: 'auto',
            spaceBetween: 50,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        /*Slider*/
        var swiper = new Swiper('.swiper-profile', {
            slidesPerView: 7,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-profile__next',
                prevEl: '.swiper-profile__prev',
            },
        });

        /*Slider*/
        var swiper = new Swiper('.swiper-workplace', {
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        /*Slider*/
        var swiper = new Swiper('.profile__task', {
            slidesPerView: 1,
            spaceBetween: 15,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        /*Slider*/
        var swiper = new Swiper('.swiper-date', {
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: {
                nextEl: '.swiper-button-next1',
                prevEl: '.swiper-button-prev1',
            },
        });

        /*Slider*/
        var swiper = new Swiper('.slider-welcome', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
        });

    }

});