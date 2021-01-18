import React from "react";
import {LogoBrand} from "./style";
import {useSelector} from "react-redux";

export default (props) => {
    const {miniSidebar} = useSelector(({app}) => app)
    return (
        <>
            <LogoBrand {...props}>
                {
                    miniSidebar
                        ? <main>A</main>
                        : (
                            <>
                                AniBla.uz
                                <div>
                                    Birinchi <span>UZ</span>fandab
                                </div>
                            </>
                        )
                }
            </LogoBrand>
        </>
    )
}