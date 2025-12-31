import { db } from './client';
import { users, customers, tickets } from './schema';
import { USER_ROLES, TICKET_STATUS, PRIORITY } from '../utils/constants';

async function seed() {
    console.log('🌱 Seeding database...');

    try {
        // Create admin user
        const [adminUser] = await db.insert(users).values({
            kindeId: 'admin_placeholder_id',
            email: 'admin@repairshop.bd',
            firstName: 'Admin',
            lastName: 'User',
            role: USER_ROLES.ADMIN,
            isActive: true,
            lastLoginAt: new Date(),
        }).returning();

        console.log('✅ Created admin user');

        // Create employee user
        const [employeeUser] = await db.insert(users).values({
            kindeId: 'employee_placeholder_id',
            email: 'employee@repairshop.bd',
            firstName: 'John',
            lastName: 'Doe',
            role: USER_ROLES.EMPLOYEE,
            isActive: true,
            lastLoginAt: new Date(),
        }).returning();

        console.log('✅ Created employee user');

        // Create sample customers
        const [customer1] = await db.insert(customers).values({
            firstName: 'আহমেদ',
            lastName: 'খান',
            email: 'ahmed.khan@example.com',
            phone: '+880 1712-345678',
            address: '123 Dhanmondi Road',
            city: 'Dhaka',
            state: 'Dhaka Division',
            zipCode: '1205',
            notes: 'Regular customer, prefers morning appointments',
            createdBy: adminUser.id,
        }).returning();

        const [customer2] = await db.insert(customers).values({
            firstName: 'Fatima',
            lastName: 'Rahman',
            email: 'fatima.rahman@example.com',
            phone: '+880 1812-987654',
            address: '456 Gulshan Avenue',
            city: 'Dhaka',
            state: 'Dhaka Division',
            zipCode: '1212',
            notes: 'VIP customer',
            createdBy: adminUser.id,
        }).returning();

        console.log('✅ Created 2 sample customers');

        // Create sample tickets
        await db.insert(tickets).values([
            {
                title: 'Laptop Screen Replacement',
                description: 'Dell laptop screen is cracked and needs replacement. Customer reported issue after dropping the device.',
                notes: 'Need to order replacement screen - Model: Dell XPS 15',
                status: TICKET_STATUS.OPEN,
                priority: PRIORITY.HIGH,
                customerId: customer1.id,
                assignedTo: employeeUser.id,
                createdBy: adminUser.id,
            },
            {
                title: 'Phone Battery Issue',
                description: 'Samsung Galaxy phone battery draining very quickly. Customer reports only 2-3 hours of battery life.',
                notes: 'Likely needs battery replacement',
                status: TICKET_STATUS.OPEN,
                priority: PRIORITY.MEDIUM,
                customerId: customer2.id,
                assignedTo: employeeUser.id,
                createdBy: adminUser.id,
            },
            {
                title: 'Computer Virus Removal',
                description: 'Desktop computer infected with malware. Running very slowly and showing popup ads.',
                notes: 'Completed full system scan and malware removal. Installed antivirus software.',
                status: TICKET_STATUS.COMPLETED,
                priority: PRIORITY.LOW,
                customerId: customer1.id,
                assignedTo: employeeUser.id,
                createdBy: adminUser.id,
                completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Completed yesterday
            },
        ]);

        console.log('✅ Created 3 sample tickets');
        console.log('🎉 Database seeding completed successfully!');
        console.log('\n📝 Sample credentials:');
        console.log('Admin email: admin@repairshop.bd');
        console.log('Employee email: employee@repairshop.bd');
        console.log('\nNote: You will need to configure these users in Kinde Auth');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}

seed()
    .catch((error) => {
        console.error('Failed to seed database:', error);
        process.exit(1);
    });
