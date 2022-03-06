// ==UserScript==
// @name        The A-Term
// @namespace   https://planted.dev
// @description A terminal for quickly and easily navigating and searching Appian
// @include     http://*/suite/*
// @include     https://*/suite/*
// @include     https://*appiancloud.com*
// @exclude     http*://*/suite/userdetail*
// @exclude     http*://*/suite/groupdetail*
// @exclude     http*://*appian.com/*
// @exclude     http*://*/suite/process-modeler-x*
// @exclude     http*://*/suite/process/*simplepopup*
// @exclude     http*://*/suite/process/*startdesigner*
// @exclude     http*://*/suite/designer/*
// @version     1.2
// @run-at      document-end
// @updateURL   https://bitbucket.org/NathanPlantAU/the-a-term/raw/master/the-a-term.user.js
// @grant       none
// ==/UserScript==
(function () {
   "use strict";

    // SET CONFIG
        var at_keypress_delta = 200,
            at_shift_key_code = 16,
            at_ctrl_key_code = 17,
            at_alt_key_code = 18,
            at_esc_key_code = 27,
            at_tab_key_code = 9,
            at_enter_key_code = 13,
            at_a_key_code = 65,
            at_d_key_code = 68,
            at_e_key_code = 69,
            at_i_key_code = 73,
            at_m_key_code = 77,
            at_o_key_code = 79,
            at_r_key_code = 82,
            at_u_key_code = 85,
            at_w_key_code = 87,
            at_colours = {
                "match": "#8aff80",
                "no_match": "#ff9580",
                "no_match_rgb": "rgb(255, 149, 128)",
                "input": "#fff",
                "predict": "#8d8f92",
                "terminal": "#22212c",
                "output": "#f2f2f2",
                "help": "#9580ff",
                "shortcuts": "#ffff80",
                "search": "#80ffea"
            },
            at_commands = [
                {
                    "name": "Show help",
                    "url": "https://bitbucket.org/NathanPlantAU/the-a-term",
                    "command": "help"
                },
                {
                    "name": "Go to admin console",
                    "url": "/suite/admin",
                    "command": "admin-console"
                },
                {
                    "name": "Go to database",
                    "url": "/suite/dblogin",
                    "command": "database"
                },
                {
                    "name": "Go to health check",
                    "url": "/suite/admin/page/health-check",
                    "command": "health-check"
                },
                {
                    "name": "Go to logs",
                    "url": "/suite/logs",
                    "command": "logs"
                },
                {
                    "name": "Go to secure credentials store",
                    "url": "/suite/admin/page/third-party-credentials",
                    "command": "secure-credentials-store"
                },
                {
                    "name": "Go to third-party credentials",
                    "url": "/suite/admin/page/third-party-credentials",
                    "command": "credentials"
                },
                {
                    "name": "Go to third-party credentials",
                    "url": "/suite/admin/page/third-party-credentials",
                    "command": "third-party-credentials"
                },
                {
                    "name": "Go to users (admin)",
                    "url": "/suite/admin/page/users",
                    "command": "users-admin"
                },
                {
                    "name": "Go to design",
                    "url": "/suite/design",
                    "command": "design"
                },
                {
                    "name": "New decision",
                    "url": "/suite/design/decision",
                    "command": "decision"
                },
                {
                    "name": "New expression rule",
                    "url": "/suite/design/rule",
                    "command": "expression-rule"
                },
                {
                    "name": "New integration",
                    "url": "/suite/design/integration",
                    "command": "integration"
                },
                {
                    "name": "New interface",
                    "url": "/suite/design/interface",
                    "command": "interface"
                },
                {
                    "name": "Go to monitoring",
                    "url": "/suite/design/processes",
                    "command": "monitoring"
                },
                {
                    "name": "Go to processes",
                    "url": "/suite/design/processes",
                    "command": "processes"
                },
                {
                    "name": "Go to objects",
                    "url": "/suite/design/objects",
                    "command": "objects"
                },
                {
                    "name": "New process Model",
                    "url": "/suite/process-modeler-x/startdesigner.none",
                    "command": "process-model"
                },
                {
                    "name": "Go to users (design)",
                    "url": "/suite/design/users",
                    "command": "users-design"
                },
                {
                    "name": "New web API",
                    "url": "/suite/design/webapi",
                    "command": "web-api"
                },
                {
                    "name": "Go to tempo",
                    "url": "/suite/tempo",
                    "command": "tempo"
                },
                {
                    "name": "Go to tempo actions",
                    "url": "/suite/tempo/actions/",
                    "command": "tempo-actions"
                },
                {
                    "name": "Go to tempo records",
                    "url": "/suite/tempo/records/",
                    "command": "tempo-records"
                },
                {
                    "name": "Go to tempo reports",
                    "url": "/suite/tempo/reports/",
                    "command": "tempo-reports"
                },
                {
                    "name": "Go to tempo tasks",
                    "url": "/suite/tempo/tasks/",
                    "command": "tempo-tasks"
                },
                {
                    "name": "Go to Appian AppMarket",
                    "url": "https://community.appian.com/b/appmarket",
                    "command": "appian-appmarket"
                },
                {
                    "name": "Go to Appian Community",
                    "url": "https://community.appian.com",
                    "command": "appian-community"
                },
                {
                    "name": "Go to Appian Documentation",
                    "url": "https://docs.appian.com",
                    "command": "appian-docs"
                },
                {
                    "name": "Go to Appian Knowledge Base",
                    "url": "https://community.appian.com/support/w/kb",
                    "command": "appian-knowledge-base"
                },
                {
                    "name": "Go to Appian Playbook",
                    "url": "https://community.appian.com/w/the-appian-playbook",
                    "command": "appian-playbook"
                }
                /*,
                {
                    "name": "Search objects",
                    "url": "",
                    "command": "search-objects"
                },
                {
                    "name": "Search records",
                    "url": "",
                    "command": "search-records"
                },
                {
                    "name": "Search reports",
                    "url": "",
                    "command": "search-reports"
                },
                {
                    "name": "Search sites",
                    "url": "",
                    "command": "search-sites"
                }*/
            ];

        // CREATE CSS CLASSES
        var at_css_classes = [
            "#at_wrapper .at_centered { position:fixed; left:50%; transform:translateX(-50%); }",
            "#at_wrapper .at_middle { position:fixed; top:50%; transform:translateY(-50%); }",
            "#at_wrapper p { padding:0 40px; font-size:18px; }"
        ];

        // CREATE ELEMENTS
        at_create_element("style", {
            "content": "".concat(at_css_classes.join("\n")),
            "append_to": document.body
        });
        at_create_element("div", {
            "id": "at_wrapper",
            "style": {
                "width": "100% !important",
                "height": "100% !important",
                "margin": "0 !important",
                "padding": "0 !important",
                "z-index": "2147483647 !important",
                "display": "none"
            },
            "children": [
                at_create_element("div", {
                    "id": "at_terminal",
                    "class": "at_centered",
                    "style": {
                        "bottom": "10px",
                        "height": "100px",
                        "background-color": at_colours.terminal,
                        "border-radius": "50px",
                        "border": "1px solid #999",
                        "box-shadow": "0 0 5px #999",
                        "z-index": "2147483647 !important",
                        "max-width": "960px",
                        "width": "50%",
                        "box-sizing": "border-box",
                        "margin": 0,
                        "padding": 0,
                        "position": "fixed"
                    },
                    "children": [
                        at_create_element("span", {
                            "id": "at_input_icon",
                            "class": "at_middle",
                            "content": ">",
                            "style": {
                                "margin": "0 0 0 40px",
                                "max-width": "50px",
                                "box-sizing": "border-box",
                                "padding": 0,
                                "border": 0,
                                "font-family": "monospace",
                                "color": at_colours.input,
                                "font-size": "30px"
                            }
                        }),
                        at_create_element("input", {
                            "id": "at_predict_field",
                            "type": "text",
                            "spellcheck": false,
                            "readonly": true,
                            "style": {
                                "color": at_colours.predict
                            }
                        }),
                        at_create_element("input", {
                            "id": "at_input_field",
                            "type": "text",
                            "placeholder": "Type or press TAB",
                            "spellcheck": false,
                            "autofocus": true,
                            "style": {
                                "color": at_colours.input
                            }
                        }),
                    ]
                }),
                at_create_element("div", {
                    "id": "at_output",
                    "class": "at_centered",
                    "children": [
                        at_create_element("div", { "id": "at_results" })
                      ],
                    "style": {
                        "top": "112px",
                        "background": "#f8f8f8",
                        "z-index": "2147483647",
                        "border-radius": "25px 25px 25px 25px",
                        "overflow": "hidden",
                        "box-shadow": "0 0 5px #999",
                        "display": "none",
                        "font-family": "sans-serif",
                        "max-width": "960px",
                        "width": "50%",
                        "box-sizing": "border-box",
                        "margin": 0,
                        "position": "relative"
                    }
                })
            ],
            "append_to": document.body
        });

        // GET CREATED ELEMENTS
        var at_elements = {
            "wrapper": document.getElementById("at_wrapper"),
            "terminal": document.getElementById("at_terminal"),
            "input": document.getElementById("at_input_field"),
            "predict": document.getElementById("at_predict_field"),
            "output": document.getElementById("at_output"),
        };

        // SET STYLE OF MULTIPLE ELEMENTS WHERE THEY ARE THE SAME FOR CLEANER CODE
        at_set_attributes([at_elements.terminal, at_elements.output], {
            "class": "at_centered",
            "style": {

            }
        });

        at_set_style([at_elements.input, at_elements.predict], {
            "height": "80px",
            "margin": "10px 0 10px 80px",
            "width": "90%",
            "max-width": "830px",
            "box-sizing": "border-box",
            "padding": 0,
            "border": 0,
            "font-family": "monospace",
            "outline": 0,
            "background": "transparent",
            "font-size": "30px",
            "position": "absolute"
        });

        // VARIABLES
        var at_last_keypress,
            at_possibilities = [],
            at_possibility_index = -1;

        // SHOW/HIDE COMMAND LISTENER
        document.onkeyup = function (at_key) {
            if (at_key.which === at_ctrl_key_code) {
                var at_keypress_time = new Date();

                if ((at_keypress_time - at_last_keypress) <= at_keypress_delta) {
                    if (at_elements.wrapper.style.display === "none") {
                        at_elements.wrapper.style.display = "block";
                        at_elements.input.focus();
                    } else {
                        at_elements.wrapper.style.display = "none";
                        at_elements.input.blur();
                        at_reset_terminal();
                    }

                    at_keypress_time = 0;
                }

                at_last_keypress = at_keypress_time;
            }
        };

        // SHORTCUT LISTENER
        document.onkeydown = function (at_key) {
            if(at_key.ctrlKey && at_key.altKey && at_key.shiftKey) {
                switch (at_key.which) {
                    case at_a_key_code:
                        window.open("/suite/admin", "_blank");
                        break;
                    case at_d_key_code:
                        window.open("/suite/design", "_blank");
                        break;
                    case at_e_key_code:
                        window.open("/suite/design/rule", "_blank");
                        break;
                    case at_i_key_code:
                        window.open("/suite/design/interface", "_blank");
                        break;
                    case at_u_key_code:
                        window.open("/suite/admin/page/users", "_blank");
                        break;
                    case at_m_key_code:
                        window.open("/suite/design/processes", "_blank");
                        break;
                    case at_o_key_code:
                        window.open("/suite/design/objects", "_blank");
                        break;
                    default: break;
                }
            }
        };

        // terminal KEYDOWN LISTENER
        at_elements.wrapper.onkeydown = function (at_key) {
            // CLEAR COMMAND LISTENER
            if (at_key.which === at_esc_key_code) {
                at_key.preventDefault();
            }
            // AUTOCOMPLETE COMMAND LISTENER
            else if (at_key.which === at_tab_key_code) {
                at_key.preventDefault();
            }
            // DO COMMAND LISTENER
            else if (at_key.which === at_enter_key_code) {
                at_key.preventDefault();
            }
        };

        // terminal KEYUP LISTENER
        at_elements.wrapper.onkeyup = function (at_key) {
            // CLEAR COMMAND LISTENER
            if (at_key.which === at_esc_key_code) {
                if(!at_elements.input.value) {
                    at_elements.wrapper.style.display = "none";
                    at_elements.input.blur();
                }

                at_reset_terminal();
            }
            // AUTOCOMPLETE COMMAND LISTENER
            else if (at_key.which === at_tab_key_code) {
                if (at_elements.input.value && at_elements.predict.value) {
                    at_possibility_index = at_possibilities.indexOf(at_elements.predict.value);

                    if (at_elements.input.value === at_elements.predict.value) {

                        at_elements.predict.value = (at_possibility_index < at_possibilities.length - 1) ? at_possibilities[at_possibility_index + 1] : at_possibilities[0];
                        at_elements.input.style.color = at_colours.match;
                    }

                    else {
                        at_elements.input.style.color = at_colours.input;
                    }

                    at_elements.input.value = at_elements.predict.value;
                    at_elements.predict.style.color = at_colours.terminal;
                    at_possibilities = at_get_possibilities();
                    at_show_prediction();

                } else {
                    if (at_elements.input.style.color !== at_colours.no_match_rgb) {
                        at_possibilities = (at_possibilities.length) ? at_possibilities : at_get_all_commands();
                        ++at_possibility_index
                        at_possibility_index = (at_possibility_index > -1 && at_possibility_index < at_possibilities.length) ? at_possibility_index : 0;
                        at_elements.input.value = at_possibilities[at_possibility_index];
                        at_elements.input.style.color = at_colours.match;
                    }
                }
            }
            // DO COMMAND LISTENER
            else if (at_key.which === at_enter_key_code) {
                at_elements.output.style.display = "none";

                var at_command_index = at_commands.map(at_item => at_item.command).indexOf(at_elements.input.value);

                if (at_command_index > -1) {
                    var at_command_url = at_commands[at_command_index].url;

                    window.open(at_command_url, "_blank");
                }
            }
            // ALL OTHER KEYS RELEASED
            else {
                // SET VARIABLES
                at_possibilities = [];
                at_possibility_index = -1;
                at_elements.predict.value = "";
                at_elements.input.style.color = at_colours.input;
                at_elements.input.value = at_elements.input.value.toLowerCase().trim();

                if (at_elements.input.value.length) {
                    // SET AUTOCOMPLETE OPTIONS
                    at_possibilities = at_get_possibilities();
                    at_show_prediction()
                }
            }
        };

        function at_reset_terminal() {
            at_possibilities = [];
            at_possibility_index = -1;
            at_elements.predict.value = "";
            at_elements.input.style.color = at_colours.input;
            at_elements.input.value = "";
            at_elements.output.style.display = "none";
        }

        function at_get_all_commands() {
            return at_commands.map(at_item => at_item.command).sort();
        }

        function at_get_possibilities() {
            var at_return = [];

            at_commands.map(at_item => at_item.command).sort().forEach((at_item) => {
                at_return.push(at_item);
            });

            return at_return;
        };

        function at_show_prediction() {
            // WHEN AUTOCOMPLETE OPTIONS EXIST
            if (at_possibilities.length) {
                at_elements.predict.value = at_possibilities[0];
                at_elements.predict.style.color = at_colours.predict;

                var at_command = at_elements.input.value.split(" ")[0];

                at_possibilities.some((at_item, at_i) => {
                    if (at_item.indexOf(at_command) === 0) {
                        at_elements.predict.value = at_item;
                        at_possibility_index = at_i;
                        return true;
                    }
                });

                if (at_possibility_index > -1) {
                    if (at_elements.predict.value.length === at_command.length) {
                        at_elements.input.style.color = at_colours.match;
                        at_elements.predict.value = "";
                    }
                } else {
                    at_elements.input.style.color = at_colours.no_match;
                    at_elements.predict.value = "";
                }
            } else {
                at_elements.input.style.color = at_colours.no_match;
                at_elements.predict.value = "";
            }
        };

        function at_create_element(at_tag_input, at_attributes_input) {
            var at_new_element = document.createElement(at_tag_input);
            at_set_attributes(at_new_element, at_attributes_input);
            return at_new_element;
        };

        function at_set_attributes(at_elements_input, at_attributes_input) {
            at_elements_input = Array.isArray(at_elements_input) ? at_elements_input : [at_elements_input];
            if (at_attributes_input) {
                at_elements_input.forEach((at_el) => {
                    for (var at_key in at_attributes_input) {
                        if (at_key === "style") {
                            at_set_style(at_el, at_attributes_input[at_key]);
                        } else if (at_key === "content") {
                            at_el.textContent = at_attributes_input[at_key];
                        } else if (at_key === "children") {
                            at_attributes_input[at_key].forEach((at_child) => {
                                at_el.appendChild(at_child);
                            });
                        } else if (at_key === "append_to") {
                            at_attributes_input[at_key].appendChild(at_el);
                        } else {
                            at_el.setAttribute(at_key, at_attributes_input[at_key]);
                        }
                    }
                });
            }

        };

        function at_set_style(at_elements_input, at_styles_input) {
            var ac_style_string = "";
            at_elements_input = Array.isArray(at_elements_input) ? at_elements_input : [at_elements_input];

            for (var at_key in at_styles_input) {
                ac_style_string += at_key + ":" + at_styles_input[at_key] + ";";
            }

            at_elements_input.forEach((at_el) => {
                at_el.style.cssText = at_el.style.cssText + ac_style_string;
            });
        };
}());