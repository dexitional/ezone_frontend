import React from 'react'
import { FaRegRectangleList } from 'react-icons/fa6'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Service from '../../utils/dricService'
import { redirect, useLoaderData } from 'react-router'
import LASByGroup from './LASByGroup'
import LASByList from './LASByFacultyList'

type Props = {}

export async function action({ params }) {
    await Service.deleteFunder(params.funderId);
    return redirect("/dric/funders");
 }

function LASFilter({}: Props) {
  return <LASByGroup />
}

export default LASFilter