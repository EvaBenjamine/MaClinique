import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import { ChevronDown, Eye, Pencil, Plus, Search, SlidersHorizontal, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/Sidebar';
import UserMultiStepForm from '@/components/multi-step-form';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { User, UserDetails } from '@/types/models';
import axios from 'axios';

export default function UsersIndex() {
    const { auth, users } = usePage().props;
    const allUsers = users;

    const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedUserDetails, setSelectedUserDetails] = useState<UserDetails | null>(null);

    const roleFilters = [
        { id: 'admin', label: 'Administrateurs' },
        { id: 'sage_femme', label: 'Sages-femmes' },
        { id: 'secretaire', label: 'Secrétaires' },
        { id: 'patiente', label: 'Patientes' },
    ];

    // Effect pour filtrer les utilisateurs quand les filtres ou la recherche changent
    useEffect(() => {
        let result = allUsers;

        // Appliquer les filtres de rôle
        if (activeFilters.length > 0) {
            result = result.filter((user) => activeFilters.includes(user.role));
        }

        // Appliquer la recherche
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (user) =>
                    user.nom.toLowerCase().includes(term) || user.prenom.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
            );
        }

        setFilteredUsers(result);
    }, [activeFilters, searchTerm, allUsers]);

    const handleCreateUser = (type: string): void => {
        setSelectedUserType(type);
        setIsCreateDialogOpen(true);
    };

    const handleViewUser = (user: User): void => {
        axios
            .get(route('users.edit', user.id))
            .then((response) => {
                const pageData = response.data;
                setSelectedUser(user);
                setSelectedUserDetails(pageData.userDetails || null);
                setIsViewDialogOpen(true);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
            });
    };

    const handleEditUser = (user: User): void => {
        axios
            .get(route('users.edit', user.id))
            .then((response) => {
                const pageData = response.data;
                setSelectedUser(user);
                setSelectedUserDetails(pageData.userDetails || null);
                setIsEditDialogOpen(true);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
            });
    };

    const handleDeleteUser = (user: User): void => {
        setSelectedUser(user);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = (): void => {
        if (selectedUser) {
            Inertia.delete(route('users.destroy', selectedUser.id), {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                },
            });
        }
    };

    const toggleFilter = (filterId: string): void => {
        setActiveFilters((prev) => {
            if (prev.includes(filterId)) {
                return prev.filter((id) => id !== filterId);
            } else {
                return [...prev, filterId];
            }
        });
    };

    const clearFilters = (): void => {
        setActiveFilters([]);
        setSearchTerm('');
    };

    const getRoleBadgeStyles = (role: string): string => {
        switch (role) {
            case 'admin':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
            case 'sage_femme':
                return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
            case 'secretaire':
                return 'bg-green-100 text-green-800 hover:bg-green-200';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        }
    };

    const getAvatarStyles = (role: string): string => {
        switch (role) {
            case 'admin':
                return 'bg-blue-100 text-blue-500';
            case 'sage_femme':
                return 'bg-purple-100 text-purple-500';
            case 'secretaire':
                return 'bg-green-100 text-green-500';
            default:
                return 'bg-gray-100 text-gray-500';
        }
    };

    const getRoleLabel = (role: string): string => {
        switch (role) {
            case 'admin':
                return 'Administrateur';
            case 'sage_femme':
                return 'Sage-femme';
            case 'secretaire':
                return 'Secrétaire';
            default:
                return 'Utilisateur';
        }
    };

    const getInitials = (nom: string, prenom: string): string => {
        return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
    };

    return (
        <Sidebar>
            <Head title="Gestion des utilisateurs" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    <Card className="mb-6 border border-gray-100 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold text-gray-800">Gestion des utilisateurs</CardTitle>

                            {auth.user.role === 'admin' && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Ajouter un utilisateur
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>Type d'utilisateur</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleCreateUser('admin')} className="flex cursor-pointer items-center">
                                            <div className="mr-2 h-3 w-3 rounded-full bg-blue-500" />
                                            Administrateur
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleCreateUser('sage_femme')} className="flex cursor-pointer items-center">
                                            <div className="mr-2 h-3 w-3 rounded-full bg-purple-500" />
                                            Sage-femme
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleCreateUser('secretaire')} className="flex cursor-pointer items-center">
                                            <div className="mr-2 h-3 w-3 rounded-full bg-green-500" />
                                            Secrétaire
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </CardHeader>
                    </Card>

                    <Card className="border border-gray-100 shadow-sm">
                        <CardContent className="p-0">
                            <div className="border-b border-gray-100 p-4">
                                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                    <div className="relative w-full md:w-96">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            placeholder="Rechercher un utilisateur..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full py-2 pr-4 pl-10"
                                        />
                                        {searchTerm && (
                                            <button onClick={() => setSearchTerm('')} className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                                                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex w-full items-center gap-2 md:w-auto">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="flex items-center gap-2">
                                                    <SlidersHorizontal className="h-4 w-4" />
                                                    <span>Filtrer</span>
                                                    {activeFilters.length > 0 && (
                                                        <Badge className="ml-1 bg-pink-500 hover:bg-pink-600">{activeFilters.length}</Badge>
                                                    )}
                                                    <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56">
                                                <DropdownMenuLabel>Rôles</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {roleFilters.map((filter) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={filter.id}
                                                        checked={activeFilters.includes(filter.id)}
                                                        onCheckedChange={() => toggleFilter(filter.id)}
                                                        className="cursor-pointer"
                                                    >
                                                        {filter.label}
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                                {(activeFilters.length > 0 || searchTerm) && (
                                                    <>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={clearFilters}
                                                            className="cursor-pointer text-red-500 hover:text-red-700 focus:text-red-700"
                                                        >
                                                            Effacer les filtres
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                {activeFilters.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {activeFilters.map((filter) => {
                                            const filterLabel = roleFilters.find((f) => f.id === filter)?.label || filter;
                                            return (
                                                <Badge
                                                    key={filter}
                                                    className="flex items-center gap-1 bg-gray-100 px-3 py-1 text-gray-800 hover:bg-gray-200"
                                                >
                                                    {filterLabel}
                                                    <button onClick={() => toggleFilter(filter)}>
                                                        <X className="ml-1 h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            );
                                        })}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearFilters}
                                            className="h-6 text-xs text-gray-500 hover:text-gray-700"
                                        >
                                            Effacer tout
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nom et Prénom</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Rôle</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredUsers.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="py-8 text-center text-gray-500">
                                                    Aucun utilisateur ne correspond à vos critères de recherche
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredUsers.map((user) => (
                                                <TableRow key={user.id} className="hover:bg-gray-50">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className={`${getAvatarStyles(user.role)} border border-white shadow-sm`}>
                                                                <AvatarFallback>{getInitials(user.nom, user.prenom)}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="font-medium">
                                                                {user.prenom} {user.nom}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-gray-600">{user.email}</TableCell>
                                                    <TableCell>
                                                        <Badge className={`${getRoleBadgeStyles(user.role)} px-2 py-1`}>
                                                            {getRoleLabel(user.role)}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleViewUser(user)}
                                                                className="text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>

                                                            {auth.user.role === 'admin' && (
                                                                <>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => handleEditUser(user)}
                                                                        className="text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                                                    >
                                                                        <Pencil className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => handleDeleteUser(user)}
                                                                        className="text-gray-600 hover:bg-red-50 hover:text-red-600"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="border-t border-gray-100 p-4 text-sm text-gray-500">
                                {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? 's' : ''} au total
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Dialog pour créer un utilisateur */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            Créer un nouveau{' '}
                            {selectedUserType === 'admin'
                                ? 'administrateur'
                                : selectedUserType === 'sage_femme'
                                  ? 'sage-femme'
                                  : selectedUserType === 'secretaire'
                                    ? 'secrétaire'
                                    : 'utilisateur'}
                        </DialogTitle>
                    </DialogHeader>
                    <UserMultiStepForm userType={selectedUserType} onComplete={() => setIsCreateDialogOpen(false)} isCreating={true} />
                </DialogContent>
            </Dialog>

            {/* Dialog pour voir les détails d'un utilisateur */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Détails de l'utilisateur</DialogTitle>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <Avatar className={`h-24 w-24 ${getAvatarStyles(selectedUser.role)} border-4 border-white shadow-md`}>
                                    <AvatarFallback className="text-2xl">{getInitials(selectedUser.nom, selectedUser.prenom)}</AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="grid gap-4">
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <h3 className="mb-1 text-sm font-medium text-gray-500">Nom complet</h3>
                                    <p className="text-base font-medium">
                                        {selectedUser.prenom} {selectedUser.nom}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <h3 className="mb-1 text-sm font-medium text-gray-500">Email</h3>
                                    <p className="text-base">{selectedUser.email}</p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <h3 className="mb-1 text-sm font-medium text-gray-500">Rôle</h3>
                                    <Badge className={`${getRoleBadgeStyles(selectedUser.role)} mt-1`}>{getRoleLabel(selectedUser.role)}</Badge>
                                </div>

                                {selectedUserDetails && selectedUser.role === 'sage_femme' && (
                                    <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Matricule</h3>
                                            <p className="text-base">{selectedUserDetails.matricule || 'Non spécifié'}</p>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Grade</h3>
                                            <p className="text-base">{selectedUserDetails.grade || 'Non spécifié'}</p>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Spécialité</h3>
                                            <p className="text-base">{selectedUserDetails.specialite || 'Non spécifié'}</p>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Téléphone</h3>
                                            <p className="text-base">{selectedUserDetails.numero_telephone || 'Non spécifié'}</p>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4 md:col-span-2">
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Adresse</h3>
                                            <p className="text-base">{selectedUserDetails.adresse || 'Non spécifié'}</p>
                                        </div>
                                    </div>
                                )}

                                {selectedUserDetails && selectedUser.role === 'secretaire' && (
                                    <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Matricule</h3>
                                            <p className="text-base">{selectedUserDetails.matricule || 'Non spécifié'}</p>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Grade</h3>
                                            <p className="text-base">{selectedUserDetails.grade || 'Non spécifié'}</p>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Téléphone</h3>
                                            <p className="text-base">{selectedUserDetails.numero_telephone || 'Non spécifié'}</p>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4 md:col-span-2">
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Adresse</h3>
                                            <p className="text-base">{selectedUserDetails.adresse || 'Non spécifié'}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog pour modifier un utilisateur */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Modifier l'utilisateur</DialogTitle>
                    </DialogHeader>
                    {selectedUser && selectedUserDetails && (
                        <UserMultiStepForm
                            userType={selectedUser.role}
                            userData={selectedUser}
                            userDetails={selectedUserDetails}
                            isEditing={true}
                            onComplete={() => setIsEditDialogOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog pour supprimer un utilisateur */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-red-600">Confirmer la suppression</DialogTitle>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="space-y-4">
                            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                                <p className="font-medium">
                                    Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
                                    <span className="font-bold">
                                        {selectedUser.prenom} {selectedUser.nom}
                                    </span>{' '}
                                    ?
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Cette action est irréversible et supprimera définitivement toutes les données associées à cet utilisateur.
                                </p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                    Annuler
                                </Button>
                                <Button variant="destructive" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                                    Supprimer définitivement
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Sidebar>
    );
}
