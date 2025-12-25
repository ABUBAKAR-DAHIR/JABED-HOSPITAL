import prisma from "@/lib/prisma"

export const getDepartments = async () => {
    const departments = await prisma.department.findMany()
    const departmentNames = departments.map(dept => dept.name)
    return departmentNames
}