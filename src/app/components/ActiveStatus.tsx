"use client";

import React from "react";
import useActiveChannel from "../hooks/useActiveChannel";

type Props = {};

const ActiveStatus = () => {
    useActiveChannel();
    return null;
};

export default ActiveStatus;
