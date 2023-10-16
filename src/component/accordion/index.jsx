import {useCallback, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import s from './styles.module.css'
import {ReactComponent as AccordionIcon} from "../../../../assets/svg/accordion.svg";

export const Accordion = ({
                              isPageSettings = false,
                              isOpenDefault = false,
                              label,
                              accordionIcon,
                              isInitiallyOpened,
                              controlledAccordion,
                              className = '',
                              children,
                          }) => {
    const [isExpanded, setIsExpanded] = useState(false),
        duration = 200,
        accordionContentRef = useRef(null),
        savedControlledAccordionChangeListener = useRef();

    useEffect(() => {
        if (controlledAccordion?.onChangeHandler) {
            savedControlledAccordionChangeListener.current = controlledAccordion.onChangeHandler;
        }
    }, [controlledAccordion?.onChangeHandler]);

    const incrementHeight = (progress) => {
        if (accordionContentRef.current) {
            const element = accordionContentRef.current,
                sectionHeight = progress * element.scrollHeight;

            element.style.height = `${sectionHeight}px`;
        }
    };

    const decrementHeight = (progress) => {
        if (accordionContentRef.current) {
            const element = accordionContentRef.current,
                sectionHeight = element.scrollHeight - progress * element.scrollHeight;

            element.style.height = `${
                sectionHeight > element.scrollHeight ? element.scrollHeight : sectionHeight
            }px`;
            element.style.overflow = 'hidden';
        }
    };

    const expandAccordion = useCallback(() => {
        const start = performance.now();

        if (accordionContentRef.current) {
            const element = accordionContentRef.current;

            requestAnimationFrame(function animate(time) {
                const runtime = time - start,
                    relativeProgress = runtime / duration,
                    process = Math.min(relativeProgress, 1);

                if (process < 1) {
                    incrementHeight(process);
                    requestAnimationFrame(animate);
                }

                if (process === 1) {
                    element.style.height = 'auto';
                    element.style.overflow = 'initial';
                }
            });
        }
    }, []);

    const collapseAccordion = useCallback(() => {
        const start = performance.now();

        if (accordionContentRef.current) {
            const element = accordionContentRef.current;

            requestAnimationFrame(function animate(time) {
                const runtime = time - start,
                    relativeProgress = runtime / duration,
                    process = Math.min(relativeProgress, 1);

                if (process < 1) {
                    decrementHeight(process);
                    requestAnimationFrame(animate);
                }
                if (process === 1) {
                    element.style.height = '';
                    element.style.overflow = '';
                }
            });
        }
    }, []);

    const updateUi = useCallback(
        (isOpen) => {
            if (isOpen) {
                expandAccordion();
            } else {
                collapseAccordion();
            }
        },
        [expandAccordion, collapseAccordion]
    );

    const toggleAccordion = useCallback(() => {
        const expanded = !isExpanded;

        updateUi(expanded);
        setIsExpanded(expanded);
    }, [isExpanded, updateUi]);

    const toggleAccordionFromOutside = useCallback(() => {
        if (
            controlledAccordion?.value !== undefined &&
            savedControlledAccordionChangeListener.current
        ) {
            const expanded = !controlledAccordion.value;

            savedControlledAccordionChangeListener.current(expanded);
        }
    }, [controlledAccordion?.value]);

    useEffect(() => {
        if (controlledAccordion?.value !== undefined) {
            updateUi(controlledAccordion.value);
        }
    }, [updateUi, controlledAccordion?.value]);

    useEffect(() => {
        if (isInitiallyOpened && controlledAccordion?.value === undefined) {
            expandAccordion();
            setIsExpanded(true);
        }
    }, [isInitiallyOpened, expandAccordion, controlledAccordion?.value]);

    useEffect(() => {
        if (isOpenDefault && !isExpanded) {
            toggleAccordion()
        }

    }, [isOpenDefault])
    return (
        <div
            className={classNames(s.accordion_wrapper, isExpanded || controlledAccordion?.value ? s.accordion_expanded : s.accordion_collapsed)}
        >
            <div className={s.accordion}>
                <div
                    className={s.accordion_header}
                    style={{
                        background: isExpanded && '#56999A'
                    }}
                    onClick={() => {
                        controlledAccordion !== undefined ? toggleAccordionFromOutside() : toggleAccordion()
                    }}
                >
                    <div className={classNames(s.header, isExpanded && s.header_icon)}>
                        {label.icon}
                    </div>
                    <p style={{
                        color: isExpanded && '#fff'
                    }}>{label.title}</p>

                </div>
                <div className={s.accordion_content} ref={accordionContentRef}>
                    <div className={s.accordion_inner_content}>{children}</div>
                </div>
            </div>
        </div>
    );
};
