const roleService = require('../services/roleService');

exports.createRole = async (req, res) => {
    try {
        const role = await roleService.createRole(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRoles = async (req, res) => {
    try {
        const roles = await roleService.getRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await roleService.getRoleById(req.params.id);
        if (!role) return res.status(404).json({ error: 'Role not found' });
        res.json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const updatedRole = await roleService.updateRole(req.params.id, req.body);
        if (!updatedRole) return res.status(404).json({ error: 'Role not found' });
        res.json(updatedRole);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const deleted = await roleService.deleteRole(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Role not found' });
        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
    
};